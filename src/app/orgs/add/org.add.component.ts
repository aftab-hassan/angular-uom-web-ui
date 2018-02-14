import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ClientConfigService } from 'ge-web-ui-lib/services';
import { ModalComponent } from 'ge-web-ui-lib/modal';
import { OrgComponentBase } from '../shared/org.base.component';
import * as fromRoot from '../../store';
import { GET_NEW_ORG, CREATE_ORG, CREATE_ORG_SUCCESS, CREATE_ORG_FAIL } from '../../store/organization/organization.actions';
import { CREATE_INSIGHT_APPLICATIONS, CREATE_INSIGHT_APPLICATIONS_SUCCESS, CREATE_INSIGHT_APPLICATIONS_FAIL } from '../../store/insightApplications/insightApplications.actions';

@Component({
    selector: 'org-add',
    templateUrl: '../shared/org.base.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddOrgComponent extends OrgComponentBase implements OnInit {    

    @ViewChild('modal') modal: ModalComponent;

    constructor(
        protected formBuilder: FormBuilder, 
        protected store: Store<fromRoot.IAppState>, 
        protected router: Router,   
        protected clientConfigService: ClientConfigService, 
        @Inject('Window') protected window: Window)
    {
        super(formBuilder, store, router, clientConfigService, window);     
        this.isNew = true;   
        this.store.dispatch({ type: GET_NEW_ORG });
        this.selectedInsightApplications$ = Observable.of([]);
        this.isLoadingSelectedInsightApplications$ = Observable.of(false);
    }

    ngOnInit(){        
        this.insightApplications$ = this.store.select(fromRoot.getInsightApplications);
        super.ngOnInit();
    }    

    submitForm(formValue){       
        super.submitForm(
            formValue, 
            (org, insightApps)=> {
                this.store.dispatch({ type: CREATE_ORG, payload: org });       
                this.store.dispatch({ type: CREATE_INSIGHT_APPLICATIONS, payload: { id: org.id, applications: insightApps } });       
            }
        );
    }
}