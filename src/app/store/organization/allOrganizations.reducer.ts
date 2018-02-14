import { Action, ActionReducer } from '@ngrx/store';

import { getSortedItems, SortInfo } from 'ge-web-ui-lib/store';

import { IOrganization } from './organization.models';

import { GET_ORG_ALL, GET_ORG_ALL_SUCCESS, GET_ORG_ALL_FAIL, SORT_ORGS, 
         GetAllOrganizationsAction, GetAllOrganizationsCompleteAction, GetAllOrganizationsFailAction, SortOrganizationsAction 
    } from './organization.actions';

export interface State{
    organizations: IOrganization[];
    loading: boolean;
    sortInfo: SortInfo;
    errorMessage?: string;
}

const defaultSort = { field: 'id', asc: true };

const defaultValue: State = {
    organizations: [],
    loading: true,
    sortInfo: defaultSort
};

export const reducer: ActionReducer<State> =
 (state: State = defaultValue, action: GetAllOrganizationsAction | GetAllOrganizationsCompleteAction | GetAllOrganizationsFailAction | SortOrganizationsAction): State => {
    switch(action.type){
        case GET_ORG_ALL:
            return { loading: true, organizations: [], sortInfo: defaultSort }

        case GET_ORG_ALL_SUCCESS:
            const orgsPayload = (<GetAllOrganizationsCompleteAction>action).payload;
            return {
                loading: false,
                organizations: [...state.organizations, ...orgsPayload.map(o=> Object.assign({}, o, {statusText: o.enabled && 'Enabled' || 'Disabled'}))],               
                sortInfo: Object.assign({}, state.sortInfo)
            }

        case GET_ORG_ALL_FAIL:
            return Object.assign({}, state, { loading: false, errorMessage: 'Failed to load organizations' })

        case SORT_ORGS:
            const sortPayload = (<SortOrganizationsAction>action).payload;
            let newSortInfo = state.sortInfo;
            const orgs = getSortedItems<IOrganization>(state, 'organizations', sortPayload, newSortInfo);
            return {
                organizations: orgs,
                loading: false,
                sortInfo: newSortInfo
            }

        default:
            return state;
    }
};

export const getOrganizations = (state: State)=> state.organizations;
export const getSortInfo = (state: State)=> state.sortInfo;
export const isLoading = (state: State)=> state.loading;
export const getErrorMessage = (state: State)=> state.errorMessage;