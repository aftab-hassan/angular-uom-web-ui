import { Component, AfterViewInit, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DELETE_APPLICATION } from '../store/deleteapplication/deleteapplication.actions';
import { SortInfo } from 'ge-web-ui-lib/store';
import { IAuthInfo } from 'ge-web-ui-lib/services';
import { GET_INSIGHT_APPLICATIONS, SORT_INSIGHT_APPLICATIONS } from '../store/insightApplications/insightApplications.actions';
import { DELETE_APPLICATION_SET_AS_DEFAULT } from '../store/deleteapplication/deleteapplication.actions';
import { IInsightApplication } from '../store/insightApplications/insightApplications.models';
import * as fromRoot from '../store';
import { UPDATE_TOP_TAB } from '../store/ui/ui.actions';
import { ConfigService } from '../../../config';

@Component({
  selector: 'insightApplications-comp',
  templateUrl: './insightApplications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsightApplicationsComponent implements OnInit{
    userInfo$: Observable<IAuthInfo>;
    applications$: Observable<IInsightApplication[]>;
    sortInfo$: Observable<SortInfo>;
    isLoading$: Observable<boolean>;
    userCanEdit$: Observable<boolean>;
    errorMessage$: Observable<string>;
    uploadApplicationSuccessMessage$: Observable<string>;
    deleteApplicationSuccessMessage$: Observable<string>;
    deleteApplicationErrorMessage$: Observable<string>;
    deleteApplicationIsSubmitSuccessful$: Observable<boolean>;
    isLoadingDeleteApplication$: Observable<boolean>;
    private userRoles: string[];
    private applicationAdmin: string;

    constructor(private store: Store<fromRoot.IAppState>){
        store.dispatch({ type: UPDATE_TOP_TAB, payload: 'apps' });
        store.dispatch({ type: GET_INSIGHT_APPLICATIONS });
        this.userInfo$ = store.select(fromRoot.getUserInfo);
        this.isLoading$ = store.select(fromRoot.isLoadingInsightApplications);
        this.userCanEdit$ = store.select(fromRoot.canUserEdit);
        this.applications$ = store.select(fromRoot.getInsightApplications);
        this.sortInfo$ = store.select(fromRoot.getInsightApplicationsSortInfo);
        this.errorMessage$ = store.select(fromRoot.getInsightApplicationsErrorMessage);
        this.uploadApplicationSuccessMessage$ = store.select(fromRoot.getApplicationPackageSuccessMessage);
        this.deleteApplicationSuccessMessage$ = store.select(fromRoot.getDeleteApplicationSuccessMessage);
        this.deleteApplicationErrorMessage$ = store.select(fromRoot.getDeleteApplicationErrorMessage);
        this.deleteApplicationIsSubmitSuccessful$ = store.select(fromRoot.isSubmitDeleteApplicationSuccessful);
        this.isLoadingDeleteApplication$ = store.select(fromRoot.isLoadingDeleteApplication);
        this.applicationAdmin = ConfigService.APPLICATION_ADMIN;
    }

    ngOnInit(){
      this.store.dispatch({ type: DELETE_APPLICATION_SET_AS_DEFAULT });

      this.userInfo$.subscribe( state => {
        if ( state ) {
          this.userRoles = state.roles;
        }
      });

      this.deleteApplicationIsSubmitSuccessful$.subscribe( isSuccess=> {
        if(isSuccess) {
          this.store.dispatch({ type: GET_INSIGHT_APPLICATIONS });
        }
      });
    }

    sort(field: string){
        this.store.dispatch({ type: SORT_INSIGHT_APPLICATIONS, payload: field });
    }

    getSortByClass(sortInfo: SortInfo, field: string){
        return (sortInfo.field === field && 'sorted-by-column') || '';
    }

    getSortDirectionClass(sortInfo: SortInfo, field: string){
        return (sortInfo.field === field) && (sortInfo.asc && 'fa-sort-asc' || 'fa-sort-desc') || '';
    }

    handleDeleteApplication(app: IInsightApplication): void {
      this.store.dispatch({ type: DELETE_APPLICATION, payload: { applicationName : app.alias, applicationEngine : app.biEngine, versionNumber : app.version } })
    }

    canAccess( expectedRole: string ): boolean {
        return this.userRoles.some( function( role ) {
          return role.toUpperCase() == expectedRole.toUpperCase();
        });
      }
}
