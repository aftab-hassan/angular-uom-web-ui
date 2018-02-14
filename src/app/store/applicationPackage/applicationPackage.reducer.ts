import { Action, ActionReducer } from '@ngrx/store';

import {
            UPDATE_APPLICATION_PACKAGE, UPDATE_APPLICATION_PACKAGE_SUCCESS, UPDATE_APPLICATION_PACKAGE_FAIL, UPDATE_APPLICATION_PACKAGE_SET_DEFAULT_STATE,
            UpdateApplicationPackageCompleteAction
       } from './applicationPackage.actions';

export interface State{
    submitting?: boolean;
    submitSuccessful?: boolean;
    errorMessage?: string;
    successMessage?: string;
}

const defaultValue: State = {
    submitSuccessful: true
};

export const reducer: ActionReducer<State> = (state: State = defaultValue, action: UpdateApplicationPackageCompleteAction): State => {
  switch(action.type){
    case UPDATE_APPLICATION_PACKAGE_SET_DEFAULT_STATE:
      return defaultValue;

    case UPDATE_APPLICATION_PACKAGE:
      return { submitting: true }

    case UPDATE_APPLICATION_PACKAGE_SUCCESS:
      return  { submitting: false, submitSuccessful: true, successMessage: 'The application package has been uploaded.' }

    case UPDATE_APPLICATION_PACKAGE_FAIL:
    {
      if(action.payload.status == 409)
        return { submitting: false, submitSuccessful: false, errorMessage: 'Could not upload application package since same alias and version number already exist.' }

      else if(action.payload.status == 412)
        return { submitting: false, submitSuccessful: false, errorMessage: 'Could not upload application package since manifest file does not match database constraints' }

      else if(action.payload.status == 400)
        return { submitting: false, submitSuccessful: false, errorMessage: 'Could not upload application package since entered alias and/or version number does not match that in manifest file.' }

      else
        return { submitting: false, submitSuccessful: false, errorMessage: 'Could not upload application package.' }
    }

    default:
      return state;
  }
};

export const isSubmitting = (state: State)=> state.submitting;
export const isSubmitSuccessful = (state: State)=> state.submitSuccessful;
export const getErrorMessage = (state: State)=> state.errorMessage;
export const getSuccessMessage = (state: State)=> state.successMessage;
