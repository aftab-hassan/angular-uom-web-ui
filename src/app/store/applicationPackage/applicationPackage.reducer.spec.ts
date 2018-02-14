/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { UPDATE_APPLICATION_PACKAGE, UPDATE_APPLICATION_PACKAGE_SUCCESS, UPDATE_APPLICATION_PACKAGE_FAIL } from './applicationPackage.actions';
import { State, reducer, isSubmitting, isSubmitSuccessful, getErrorMessage, getSuccessMessage } from './applicationPackage.reducer';

describe('applicationPackage.reducers', () => {

    it('update application package action returns a submitting state',  async(() => {
        // arrange
        const state: State = {
            submitting: false,
            submitSuccessful: false,
            errorMessage: "errorMessage",
            successMessage: "successMessage"
        }

        // act
        const newState: State = reducer(state, { type: UPDATE_APPLICATION_PACKAGE })

        // assert
        expect(newState).toEqual({ submitting: true });
        expect(isSubmitting(newState)).toBe(true);
    }));

    it('update application package action success returns an success state',  async(() => {
         // arrange
        const state: State = {
            submitting: false,
            submitSuccessful: false,
            errorMessage: "errorMessage",
            successMessage: "successMessage"
        }

        // act
        const newState: State = reducer(state, { type: UPDATE_APPLICATION_PACKAGE_SUCCESS })

        // assert
        const successMessage = 'The application package has been uploaded.';
        expect(newState).toEqual({ submitting: false, submitSuccessful: true, successMessage: successMessage });
        expect(isSubmitting(newState)).toBe(false);
        expect(isSubmitSuccessful(newState)).toBe(true);
        expect(getSuccessMessage(newState)).toBe(successMessage);
        expect(getErrorMessage(newState)).toBeFalsy();
    }));
});
