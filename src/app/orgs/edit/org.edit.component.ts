import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { getUserInfo } from 'ge-web-ui-lib/store';
import { ClientConfigService } from 'ge-web-ui-lib/services';
import { ModalComponent } from 'ge-web-ui-lib/modal';

import { OrgComponentBase } from '../shared/org.base.component';
import * as fromRoot from '../../store';
import { GET_ORG, UPDATE_ORG, UPDATE_ORG_SUCCESS, UPDATE_ORG_FAIL } from '../../store/organization/organization.actions';
import {
            GET_SELECTED_INSIGHT_APPLICATIONS, GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS, GET_SELECTED_INSIGHT_APPLICATIONS_FAIL,
            UPDATE_INSIGHT_APPLICATIONS, UPDATE_INSIGHT_APPLICATIONS_SUCCESS, UPDATE_INSIGHT_APPLICATIONS_FAIL
       } from '../../store/insightApplications/insightApplications.actions';
import { IInsightApplication } from '../../store/InsightApplications/insightApplications.models';

@Component({
    selector: 'org-edit',
    templateUrl: '../shared/org.base.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditOrgComponent extends OrgComponentBase implements OnInit {

    @ViewChild('modal') modal: ModalComponent;
    orgId: string;

    constructor(
        protected formBuilder: FormBuilder,
        protected store: Store<fromRoot.IAppState>,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected clientConfigService: ClientConfigService,
        @Inject('Window') protected window: Window)
    {
        super(formBuilder, store, router, clientConfigService, window);
        this.isNew = false;
        this.initializeModels();
    }

    ngOnInit(){
        if(this.isAdminApp){
            this.insightApplications$ = this.store.select(fromRoot.getInsightApplications)
        } else {
            this.insightApplications$ = this.store.select(fromRoot.getSelectedInsightApplications)
        }

        super.ngOnInit();
    }

    submitForm(formValue){
        super.submitForm(
            formValue,
            (org, insightApps)=> {
                this.store.dispatch({ type: UPDATE_ORG, payload: org });
                if(this.isAdminApp){
                    this.store.dispatch({ type: UPDATE_INSIGHT_APPLICATIONS, payload: { id: org.id, applications: insightApps } });
                }
            },
            this.orgId
        );
    }

    private initializeModels(){
        this.authInfo$ = this.store.select(getUserInfo);
        this.selectedInsightApplications$ = this.store.select(fromRoot.getSelectedInsightApplications);
        this.isLoadingSelectedInsightApplications$ = this.store.select(fromRoot.isLoadingSelectedInsightApplications);

        if(this.isAdminApp){
            this.activatedRoute.params.subscribe(params=> {
                this.orgId = params['id'];
                this.dispathActions();
            })
        } else {
            this.authInfo$.subscribe(authInfo=> {
                this.orgId = authInfo.tenantId;
                this.dispathActions();
            })
        }
    }

    private dispathActions(){
        this.store.dispatch({ type: GET_ORG, payload: { id: this.orgId } });
        this.store.dispatch({ type: GET_SELECTED_INSIGHT_APPLICATIONS, payload: { id: this.orgId } });
    }
}
