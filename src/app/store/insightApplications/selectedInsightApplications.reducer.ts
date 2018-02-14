import { Action, ActionReducer } from '@ngrx/store';
import { IInsightApplication } from './insightApplications.models';

import { GET_SELECTED_INSIGHT_APPLICATIONS, 
         GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS, GET_SELECTED_INSIGHT_APPLICATIONS_FAIL,
         CREATE_INSIGHT_APPLICATIONS, UPDATE_INSIGHT_APPLICATIONS,
         CREATE_INSIGHT_APPLICATIONS_SUCCESS, CREATE_INSIGHT_APPLICATIONS_FAIL,
         UPDATE_INSIGHT_APPLICATIONS_SUCCESS, UPDATE_INSIGHT_APPLICATIONS_FAIL,
         GetSelectedInsightApplicationsAction, GetSelectedInsightApplicationsCompleteAction
       } from './insightApplications.actions';

export interface State{
    insightApplications: IInsightApplication[];
    loading: boolean;
    submitting?: boolean;
    submitSuccessful?: boolean;
    errorMessage?: string;
    successMessage?: string;
}

const defaultValue: State = {
    insightApplications: [],
    loading: true
};

export const reducer: ActionReducer<State> =
 (state: State = defaultValue, action: GetSelectedInsightApplicationsAction | GetSelectedInsightApplicationsCompleteAction): State => {
    switch(action.type){
        case GET_SELECTED_INSIGHT_APPLICATIONS:
            return { insightApplications: [], loading: true }

        case GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS:
            return { insightApplications: [...state.insightApplications, ...action.payload], loading: false }

        case GET_SELECTED_INSIGHT_APPLICATIONS_FAIL:
            return Object.assign({}, state, { loading: false, errorMessage: 'Failed to load insight application' })

        case CREATE_INSIGHT_APPLICATIONS:
        case UPDATE_INSIGHT_APPLICATIONS:
            return Object.assign({}, state, { submitting: true }) 
     
        case CREATE_INSIGHT_APPLICATIONS_SUCCESS:
            return Object.assign({}, state, { submitting: false, submitSuccessful: true, successMessage: 'Created insight application' }) 

        case UPDATE_INSIGHT_APPLICATIONS_SUCCESS:
            return Object.assign({}, state, { submitting: false, submitSuccessful: true, successMessage: 'Updated insight application' }) 

        case CREATE_INSIGHT_APPLICATIONS_FAIL:
            return Object.assign({}, state, { submitting: false, submitSuccessful: false, errorMessage: 'Failed to create insight application' })   

        case UPDATE_INSIGHT_APPLICATIONS_FAIL:  
            return Object.assign({}, state, { submitting: false, submitSuccessful: false, errorMessage: 'Failed to update insight application' })   

        default:
            return state;
    }
};

export const getInsightApplications = (state: State)=> state.insightApplications;
export const isLoading = (state: State)=> state.loading;
export const isSubmitting = (state: State)=> state.submitting;
export const isSubmitSuccessful = (state: State)=> state.submitSuccessful;
export const getErrorMessage = (state: State)=> state.errorMessage;
export const getSuccessMessage = (state: State)=> state.successMessage;