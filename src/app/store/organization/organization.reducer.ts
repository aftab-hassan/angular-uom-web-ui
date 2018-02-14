import { Action, ActionReducer } from '@ngrx/store';
import { IOrganization } from './organization.models';

import { GET_NEW_ORG, GET_ORG, GET_ORG_SUCCESS, GET_ORG_FAIL,
         CREATE_ORG, CREATE_ORG_SUCCESS, CREATE_ORG_FAIL,
         UPDATE_ORG, UPDATE_ORG_SUCCESS, UPDATE_ORG_FAIL,
         GetOrganizationAction, GetOrganizationCompleteAction
} from './organization.actions';

export interface State{
    organization?: IOrganization;
    loading: boolean;
    submitting?: boolean;
    submitSuccessful?: boolean;    
    errorMessage?: string;
    successMessage?: string;
}

const defaultValue: State = {
    loading: true
};

export const reducer: ActionReducer<State> =
 (state: State = defaultValue, action: GetOrganizationAction | GetOrganizationCompleteAction): State => {
    switch(action.type){
        case GET_ORG:
            return { loading: true };

        case GET_ORG_SUCCESS:
            return {
               organization: Object.assign({}, action.payload, { statusText: action.payload.enabled && 'Enabled' || 'Disabled' }),
               loading: false
            }

        case GET_ORG_FAIL:
            return Object.assign({}, state, { loading: false, errorMessage: 'Failed to load organization' })

        case GET_NEW_ORG:
            return {
                organization: {  
                    id: '',
                    contact: '',
                    customerType: 'EXTERNAL',
                    enabled: true,
                    location: '',
                    organizationName: '',
                    registrationPending: false,
                    statusText: 'Enabled',          
                    admins : [{ name: '', email: '' }],
                    tags : [{ name: '', value: '' }],
                    apps : [],
                },
                loading: false
            }

        case CREATE_ORG:
        case UPDATE_ORG: 
            return Object.assign({}, state, { submitting: true })

        case CREATE_ORG_SUCCESS:
            return Object.assign({}, state, { submitting: false, submitSuccessful: true, successMessage: 'Created organization' }) 
            
        case UPDATE_ORG_SUCCESS:
            return Object.assign({}, state, { submitting: false, submitSuccessful: true, successMessage: 'Updated organization' }) 

        case CREATE_ORG_FAIL:
            return Object.assign({}, state, { submitting: false, submitSuccessful: false, errorMessage: 'Failed to create organization' })  

        case UPDATE_ORG_FAIL:  
            return Object.assign({}, state, { submitting: false, submitSuccessful: false, errorMessage: 'Failed to update organization' })      
      
        default:
            return state;
    }
};

export const getOrganization = (state: State)=> state.organization;
export const isLoading = (state: State)=> state.loading;
export const isSubmitting = (state: State)=> state.submitting;
export const isSubmitSuccessful = (state: State)=> state.submitSuccessful;
export const getErrorMessage = (state: State)=> state.errorMessage;
export const getSuccessMessage = (state: State)=> state.successMessage;