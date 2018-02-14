import { Action, ActionReducer } from '@ngrx/store';

import { getSortedItems, SortInfo } from 'ge-web-ui-lib/store';
import { IInsightApplication } from './insightApplications.models';

import {
            GET_INSIGHT_APPLICATIONS, GET_INSIGHT_APPLICATIONS_SUCCESS, GET_INSIGHT_APPLICATIONS_FAIL, SORT_INSIGHT_APPLICATIONS,
            GetInsightApplicationsAction, GetInsightApplicationsCompleteAction, SortApplicationsAction
       } from './insightApplications.actions';

export interface State{
    insightApplications: IInsightApplication[];
    sortInfo: SortInfo;
    loading: boolean;
    errorMessage?: string;
}
const defaultSort = { field: 'alias', asc: false };

const defaultValue: State = {
    insightApplications: [],
    sortInfo: defaultSort,
    loading: true
};

export const reducer: ActionReducer<State> =
 (state: State = defaultValue, action: GetInsightApplicationsAction | GetInsightApplicationsCompleteAction | SortApplicationsAction): State => {
    switch(action.type){
        case GET_INSIGHT_APPLICATIONS:
            return {
                insightApplications: [],
                sortInfo: defaultSort,
                loading: true
            }

        case GET_INSIGHT_APPLICATIONS_SUCCESS:
            let result = {
               insightApplications: [...state.insightApplications, ...(<GetInsightApplicationsCompleteAction>action).payload],
               sortInfo: defaultSort,
               loading: false
            }
            result.insightApplications = getSortedItems<IInsightApplication>(result, 'insightApplications', defaultSort.field, <any>{});
            return result;

        case GET_INSIGHT_APPLICATIONS_FAIL:
            return Object.assign({}, state, { loading: false, errorMessage: 'Failed to load insight applications' })

        case SORT_INSIGHT_APPLICATIONS:
            const sortPayload = (<SortApplicationsAction>action).payload;
            let newSortInfo: SortInfo = { field: '', asc: false };
            const apps = getSortedItems<IInsightApplication>(state, 'insightApplications', sortPayload, newSortInfo);
            return {
                insightApplications: apps,
                loading: false,
                sortInfo: newSortInfo
            }

        default:
            return state;
    }
};

export const getInsightApplications = (state: State)=> state.insightApplications;
export const getSortInfo = (state: State)=> state.sortInfo;
export const isLoading = (state: State)=> state.loading;
export const getErrorMessage = (state: State)=> state.errorMessage;
