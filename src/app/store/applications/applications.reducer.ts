import { Action, ActionReducer } from '@ngrx/store';
import { IApplication } from './applications.models';

import { GET_APPLICATIONS, GET_APPLICATIONS_SUCCESS, GET_APPLICATIONS_FAIL, GetApplicationsAction, GetApplicationsCompleteAction } from './applications.actions';

export interface State{
    applications: IApplication[];
    loading: boolean;
    errorMessage?: string;
}

const defaultValue: State = {
    applications: [],
    loading: true
};

export const reducer: ActionReducer<State> =
 (state: State = defaultValue, action: GetApplicationsAction | GetApplicationsCompleteAction): State => {
    switch(action.type){
        case GET_APPLICATIONS:
            return {
                applications: [],
                loading: true
            }

        case GET_APPLICATIONS_SUCCESS:
            const actionPayload = (<GetApplicationsCompleteAction>action).payload;
            const analyticsAppName = actionPayload.analyticsAppName.toLowerCase();
            const applications = actionPayload.applications;
            return {
                applications: [
                   ...state.applications, 
                   ...applications.map(a=> Object.assign({}, a, { isInsightsApp: (a.name || '').toLowerCase() === analyticsAppName }) )
                ],               
                loading: false
            }

        case GET_APPLICATIONS_FAIL:
            return Object.assign({}, state, { loading: false, errorMessage: 'Failed to load applications' })

        default:
            return state;
    }
};

export const getApplications = (state: State)=> state.applications;
export const isLoading = (state: State)=> state.loading;
export const getErrorMessage = (state: State)=> state.errorMessage;