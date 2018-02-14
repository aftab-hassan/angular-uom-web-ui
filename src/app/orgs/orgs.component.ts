import { Component, AfterViewInit, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SortInfo } from 'ge-web-ui-lib/store';

import { GET_ORG_ALL, SORT_ORGS } from '../store/organization/organization.actions';
import * as fromRoot from '../store';
import { UPDATE_TOP_TAB } from '../store/ui/ui.actions';
import { IOrganization } from '../store/organization/organization.models';

@Component({
  selector: 'orgs-comp',
  templateUrl: './orgs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgsComponent implements OnInit{
    orgs$: Observable<IOrganization[]>;
    sortInfo$: Observable<SortInfo>;
    isLoading$: Observable<boolean>;
    userCanEdit$: Observable<boolean>;
    errorMessage$: Observable<string>;

    constructor(private store: Store<fromRoot.IAppState>){
        store.dispatch({ type: UPDATE_TOP_TAB, payload: 'orgs' });
        store.dispatch({ type: GET_ORG_ALL });
        this.isLoading$ = store.select(fromRoot.isLoadingAllOrganizations);
        this.userCanEdit$ = store.select(fromRoot.canUserEdit);
        this.orgs$ = store.select(fromRoot.getAllOrganizations);
        this.sortInfo$ = store.select(fromRoot.getAllOrganizationSortInfo);
        this.errorMessage$ = store.select(fromRoot.getAllOrganizationsErrorMessage);
    }

    ngOnInit(){ }

    sort(field: string){
        this.store.dispatch({ type: SORT_ORGS, payload: field });
    }

    getSortByClass(sortInfo: SortInfo, field: string){
        return (sortInfo.field === field && 'sorted-by-column') || '';
    }

    getSortDirectionClass(sortInfo: SortInfo, field: string){
        return (sortInfo.field === field) && (sortInfo.asc && 'fa-sort-asc' || 'fa-sort-desc') || '';
    }
}
