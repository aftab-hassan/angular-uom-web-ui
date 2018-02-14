import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, AsyncSubject } from 'rxjs';

import { getUserInfo, getAuthCode } from 'ge-web-ui-lib/store';
import { CanComponentDeactivate } from 'ge-web-ui-lib/guards';
import { IAuthInfo, ClientConfigService } from 'ge-web-ui-lib/services';
import { IAuthZ } from 'ge-web-ui-lib/store';
import { ModalComponent } from 'ge-web-ui-lib/modal';

import * as fromRoot from '../../store';
import { IClientSettings } from '../../../../config';
import { GET_NEW_ORG, CREATE_ORG, CREATE_ORG_SUCCESS, CREATE_ORG_FAIL } from '../../store/organization/organization.actions';
import { GET_APPLICATIONS } from '../../store/applications/applications.actions';
import { GET_INSIGHT_APPLICATIONS, CREATE_INSIGHT_APPLICATIONS, CREATE_INSIGHT_APPLICATIONS_SUCCESS, CREATE_INSIGHT_APPLICATIONS_FAIL } 
        from '../../store/insightApplications/insightApplications.actions';
import { IOrganization, IAdmin, ITag } from '../../store/organization/organization.models';
import { IApplication } from '../../store/applications/applications.models';
import { IInsightApplication } from '../../store/InsightApplications/insightApplications.models';

export class OrgComponentBase implements CanComponentDeactivate {   
    org$: Observable<IOrganization>;
    applications$: Observable<IApplication[]>;
    insightApplications$: Observable<IInsightApplication[]>;
    selectedInsightApplications$: Observable<IInsightApplication[]>;
    isLoadingSelectedInsightApplications$: Observable<boolean>;

    authInfo$: Observable<IAuthInfo>;  
    authzInfo$: Observable<IAuthZ>;  
    userCanEdit$: Observable<boolean>;

    isLoading$: Observable<boolean>;
    isSubmitting$: Observable<boolean>; 
    isSubmitSuccessful$: Observable<boolean>;
    errorMessage$: Observable<string>;    
    successMessage$: Observable<string>;    
    
    isFormBuilt$: Observable<boolean>;    
    hasSelectedApps$: Observable<boolean> = Observable.of(false);    
    deactivateRoute$: AsyncSubject<boolean>;

    isAdminApp: boolean;
    isNew: boolean;
    orgsForm: FormGroup;
    
    @ViewChild('modal') modal: ModalComponent;

    constructor(
        protected formBuilder: FormBuilder, 
        protected store: Store<fromRoot.IAppState>, 
        protected router: Router,        
        protected clientConfigService: ClientConfigService, 
        @Inject('Window') protected window: Window)
    {        
        this.isAdminApp = (<IClientSettings>clientConfigService.value()).isAdminApp;
        this.isAdminApp && (this.store.dispatch({ type: GET_INSIGHT_APPLICATIONS }))
    }

    canDeactivate(): Observable<boolean> {
        if(!this.orgsForm || this.orgsForm.pristine) return Observable.of(true);

        this.modal.show();
        this.deactivateRoute$ = new AsyncSubject<boolean>();
        return this.deactivateRoute$;
    }

    closeModal(deactivate: boolean){
        this.deactivateRoute$.next(deactivate);
        this.deactivateRoute$.complete();
    }

    ngOnInit(){
        this.org$ = this.store.select(fromRoot.getSelectedOrganization);     
        this.applications$ = this.store.select(fromRoot.getApplications);
        this.authInfo$ = this.store.select(getUserInfo);
        this.authzInfo$ = this.store.select(getAuthCode);        
        this.userCanEdit$ = this.store.select(fromRoot.canUserEdit);
        this.initializeStatusModels();

        Observable.combineLatest(
            this.authInfo$, 
            this.authzInfo$,             
            (userInfo, authz)=> ({ userInfo: userInfo, code: authz.code})
        )
        .distinctUntilChanged()
        .subscribe(result=>{
             if(result.userInfo && result.code){
                 this.store.dispatch({ type: GET_APPLICATIONS, payload: {id: result.userInfo.tenantId } })
             }
        });
        
        Observable.combineLatest(
            this.isLoading$, 
            this.userCanEdit$,             
            (isLoading, canEdit)=> ({ isLoading: isLoading, canEdit: canEdit})
        )
        .subscribe(result=>{
             !result.isLoading && this.buildForm(result.canEdit);
        });
     }  

    protected submitForm(formValue, dispathActions: (org: IOrganization, insightApps: string[])=> void, orgId: string = null){              
        const org = this.getOrgToSubmit(formValue, orgId);       
        if(!org){
            this.window.scrollTo(0, 0);
            return;
        }

        dispathActions(org, this.getSelectedInsightApps(formValue));      

        const subscription = this.isSubmitSuccessful$
        .subscribe(isCompleted=> {
            if(isCompleted){
                subscription.unsubscribe();
                this.orgsForm.markAsPristine();
                Observable.timer(1000).subscribe(()=> this.router.navigate(['/']))
            }
        }, error=> {
            subscription.unsubscribe();
            this.window.scrollTo(0, 0);
        });
    }

    private getOrgToSubmit(formValue, orgId = null): IOrganization{
         const org = {
            id: (formValue.id || orgId).trim(),           
            organizationName: formValue.organizationName.trim(),
            enabled: !formValue.status,
            customerType: formValue.customerType,
            location: formValue.location.trim(),
            contact: formValue.contact.trim(),
            admins: formValue.admins,
            tags: formValue.tags,
            registrationPending: false,
            apps: formValue.apps.map(a=> ({ k: Object.keys(a).filter(k=> k !== 'insightApps')[0], v: a })).filter(a=> a.v[a.k]).map(a=> a.k)
        };

        return this.validateAdmins(org.admins) && org;
    }    

    private getSelectedInsightApps(formValue): Array<string>{
        const getAppInfo = ia=> { 
            const id = Object.keys(ia)[0]
            const lastIndex = id.lastIndexOf('/')
            return {
                alias: id.slice(0, lastIndex),
                version: id.slice(lastIndex + 1)
            }
        }

        return formValue.apps.filter(a=> !!a.insightApps).map(a=> a.insightApps)[0].filter(ia=> ia[Object.keys(ia)[0]]).map(ia=> getAppInfo(ia))
    }

    private initializeStatusModels(){
        this.isLoading$ = Observable.combineLatest(
            this.store.select(fromRoot.isLoadingSelectedOrganization),
            this.store.select(fromRoot.isLoadingApplications),
            this.isAdminApp && this.store.select(fromRoot.isLoadingInsightApplications) || Observable.of(false),
            this.isLoadingSelectedInsightApplications$,
            (l1, l2, l3, l4) => l1 || l2 || l3 || l4
        );

        this.errorMessage$ = Observable.concat(
            this.store.select(fromRoot.getAllOrganizationsErrorMessage),
            this.store.select(fromRoot.getSelectedOrganizationErrorMessage),
            this.store.select(fromRoot.getApplicationsErrorMessage),
            this.store.select(fromRoot.getInsightApplicationsErrorMessage),
            this.store.select(fromRoot.getSelectedInsightApplicationsErrorMessage)
        )

        this.successMessage$ = Observable.concat(
            this.store.select(fromRoot.getSelectedOrganizationSuccessMessage),
            this.store.select(fromRoot.getSelectedInsightApplicationsSuccessMessage)
        )

        this.isSubmitting$ = Observable.concat(
            this.store.select(fromRoot.isSubmittingSelectedOrganization),
            this.isAdminApp && this.store.select(fromRoot.isSubmittingSelectedInsightApplications) || Observable.of(false)
        )

        this.isSubmitSuccessful$ = Observable.combineLatest(
            this.store.select(fromRoot.isSubmitSelectedOrganizationSuccessful),
            this.isAdminApp && this.store.select(fromRoot.isSubmitSelectedInsightApplicationsSuccessful) || Observable.of(true),
            (s1, s2)=> s1 && s2
        )
        .switchMap(s=> s === false && Observable.throw('error') || Observable.of(s));
    }

    private buildForm(canEdit: boolean){       
        Observable.combineLatest(
            this.org$, this.applications$, this.insightApplications$, this.selectedInsightApplications$,
            (org, apps, insightApps, selectedInsightApps)=> ({ org: org, apps: apps, insightApps: insightApps, selectedInsightApps: selectedInsightApps })
        )
        .subscribe(result=> {
            this.buildBasicForm(result.org, canEdit)
            this.setAppSelection(result.org, result.apps, result.insightApps, result.selectedInsightApps);
            this.buildAppsForm(result.apps, result.insightApps, canEdit)
            this.isFormBuilt$ = Observable.of(true);
        });
    }

    private setAppSelection(org, apps, insightApps, selectedInsightApps){
        org && apps && apps.forEach(a=> a.selected = org.apps.some(id=> id === a.id));
        insightApps && selectedInsightApps && insightApps.forEach(a=> a.selected = selectedInsightApps.some(ia=> a.alias === ia.alias && a.version == ia.version));
        this.hasSelectedApps$ = Observable.of(apps.some(a=> a.selected))
    }

    private buildBasicForm(org: IOrganization, canEdit: boolean){
        if(!org) return;

        let controls = {
            'organizationName': [{ value: org.organizationName, disabled: !canEdit }, [Validators.required, OrgComponentBase.alphaNumericValidator, Validators.maxLength(35)]],          
            'location': [{ value: org.location, disabled: !canEdit }, [Validators.required, OrgComponentBase.alphaNumericValidator, Validators.maxLength(100)]],
            'contact': [{ value: org.contact, disabled: !canEdit }, [Validators.required, OrgComponentBase.alphaNumericValidator, Validators.maxLength(100)]],
            'customerType': [{ value: org.customerType, disabled: !canEdit }, Validators.required],
            'status': [{ value: !org.enabled, disabled: !canEdit }],
            'admins': this.buildAdminsInputs(org, canEdit),
            'tags': this.buildTagsInputs(org, canEdit)
        };

        this.isNew && (
            controls['id'] = [{ value: '', disabled: !canEdit }, [Validators.required, OrgComponentBase.idValidator, Validators.maxLength(50)]]
        );

        this.orgsForm = this.formBuilder.group(controls);
    }

    private buildAppsForm(applications: Array<IApplication>, insightApplications: Array<IInsightApplication>, canEdit: boolean){
        if(!applications || !applications.length || !insightApplications || !insightApplications.length) return;
        this.orgsForm.addControl('apps', this.buildApplicationsInputs(applications, insightApplications, canEdit));        
    }   
    
    private buildApplicationsInputs(applications: Array<IApplication>, insightApplications: Array<IInsightApplication>, canEdit: boolean){
        return new FormArray(applications.map(a=>{ 
            const appCtr = new FormControl({ value: !!a.selected, disabled: !canEdit });
            appCtr.valueChanges.subscribe(this.selectChildApps.bind(this, appCtr));
            const insightAppsCtrs = new FormArray(insightApplications.map(ia=> {
                const insightCtr = new FormControl({ value: !!ia.selected, disabled: !canEdit });
                insightCtr.valueChanges.subscribe(this.selectParentApp.bind(this, appCtr));
                return new FormGroup({ [`${ia.alias}/${ia.version}`]: insightCtr });
            }));
            return a.isInsightsApp && new FormGroup({ [a.id]: appCtr, 'insightApps': insightAppsCtrs }) || new FormGroup({ [a.id]: appCtr });
        }));
    }      

    private buildAdminsInputs(org: IOrganization, canEdit: boolean){
        return new FormArray(org.admins.map(a=>
             new FormGroup({             
                name: new FormControl({ value: a.name, disabled: !canEdit }, [Validators.required, OrgComponentBase.alphaNumericValidator, Validators.maxLength(35)]),
                email: new FormControl({ value: a.email, disabled: !canEdit }, [Validators.required, OrgComponentBase.emailValidator])
            })
        ));
    }

    private buildTagsInputs(org: IOrganization, canEdit: boolean){
        return new FormArray(org.tags.map(t=>  
            new FormGroup({
                name: new FormControl({ value: t.name, disabled: !canEdit }, [Validators.required, OrgComponentBase.alphaNumericValidator, Validators.maxLength(15)]),
                value: new FormControl({ value: t.value, disabled: !canEdit }, [Validators.required, OrgComponentBase.alphaNumericValidator, Validators.maxLength(50)])
            })
        ));
    }

    static alphaNumericValidator(control){
        if (control.value.match(/^[a-zA-Z0-9_\s\-\.\,\&]+$/)) {
            return null;
        } else {
            return { 'invalidValue': true };
        }
    }

    // TODO: merge with service errorMessage
    private validateAdmins(admins: Array<IAdmin>, error: string = ''): boolean {
        if(!admins.length){
            error = "An organization need to have at least one administrator with valid name and email.";
            return false;
        }

        var hasEmptyAdminNameOrEmail = admins.some(a=> !a.name || !a.name.trim().length || !a.email || !a.email.trim().length);
        if(hasEmptyAdminNameOrEmail){
            error = "Empty name or email is not allowed for an administrator.";                
            return false;
        }

        return true;
    }  
    
    static idValidator(control){
        if (control.value.match(/^[a-zA-Z0-9\-]+$/)) {
            return null;
        } else {
            return { 'invalidOrgId': true };
        }
    }

    static emailValidator(control) {
        if (control.value.match(/^[a-zA-Z0-9_\s\-\.\,\&]+@[a-zA-Z0-9_\s\-\.\,\&]+\.[a-zA-Z]{2,}$/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }   

    addAdmin(){
        (<FormArray>this.orgsForm.controls['admins']).push(
            new FormGroup({             
                name: new FormControl('', [Validators.required, OrgComponentBase.alphaNumericValidator, Validators.maxLength(35)]),
                email: new FormControl('', [Validators.required, OrgComponentBase.emailValidator])
            })
        );
    }
    
    removeAdmin(i: number) {
        (<FormArray>this.orgsForm.controls['admins']).removeAt(i);
    }

    addTag(){
        (<FormArray>this.orgsForm.controls['tags']).push(
            new FormGroup({             
                name: new FormControl('', [Validators.required, OrgComponentBase.alphaNumericValidator, Validators.maxLength(15)]),
                value: new FormControl('', [Validators.required, OrgComponentBase.alphaNumericValidator, Validators.maxLength(50)])
            })
        );
    }
    
    removeTag(i: number) {
        (<FormArray>this.orgsForm.controls['tags']).removeAt(i);
    }

    selectParentApp(ctr){
        ctr.setValue(ctr.parent.controls.insightApps.controls.some(c=> c.value), { emitEvent: false });
    }

    selectChildApps(ctr){
        if(ctr.parent.controls.insightApps){
            ctr.parent.controls.insightApps.controls.forEach(c=> {
                const key = Object.keys(c.controls)[0];
                c.controls[key].setValue(ctr.value, { emitEvent: false })
            });
        }
    }
}