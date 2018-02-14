import { Action, ActionReducer } from '@ngrx/store';

import { DELETE_APPLICATION, DELETE_APPLICATION_SUCCESS, DELETE_APPLICATION_FAIL, DELETE_APPLICATION_SET_AS_DEFAULT, DeleteApplicationCompleteAction, DeleteApplicationFailAction } from './deleteapplication.actions';

export interface State{
    submitting?: boolean;
    submitSuccessful?: boolean;
    errorMessage?: string;
    successMessage?: string;
    loading: boolean;
}

const defaultValue: State = {
    submitSuccessful: true,
    loading: false
};

export const reducer: ActionReducer<State> = (state: State = defaultValue, action: DeleteApplicationCompleteAction | DeleteApplicationFailAction): State => {
    switch(action.type){
        case DELETE_APPLICATION_SET_AS_DEFAULT:
            return defaultValue;

        case DELETE_APPLICATION:
            return { loading: true, submitting: true };

        case DELETE_APPLICATION_SUCCESS:
            return  { loading: false, submitting: false, submitSuccessful: true, successMessage: 'The application has been deleted.' }

        case DELETE_APPLICATION_FAIL:
        {
          if(action.payload.status == 500)
            return { loading: false, submitting: false, submitSuccessful: false, errorMessage: 'Could not delete the application since it is currently in use.' }

          else
            return { loading: false, submitting: false, submitSuccessful: false, errorMessage: 'Could not delete the application.' }
        }

        default:
            return state;
    }
};

export const isSubmitting = (state: State)=> state.submitting;
export const isSubmitSuccessful = (state: State)=> state.submitSuccessful;
export const getErrorMessage = (state: State)=> state.errorMessage;
export const isLoading = (state: State)=> state.loading;
export const getSuccessMessage = (state: State)=> state.successMessage;
