/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { IInsightApplication } from './insightApplications.models';
import {
        GET_SELECTED_INSIGHT_APPLICATIONS, GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS, GET_SELECTED_INSIGHT_APPLICATIONS_FAIL,
        CREATE_INSIGHT_APPLICATIONS, CREATE_INSIGHT_APPLICATIONS_SUCCESS, CREATE_INSIGHT_APPLICATIONS_FAIL,
        UPDATE_INSIGHT_APPLICATIONS, UPDATE_INSIGHT_APPLICATIONS_SUCCESS, UPDATE_INSIGHT_APPLICATIONS_FAIL
    } from './insightApplications.actions';
import { State, reducer, getInsightApplications, isSubmitting, isSubmitSuccessful, isLoading, getErrorMessage, getSuccessMessage } from './selectedInsightApplications.reducer';

describe('selectedInsightApplications.reducers', () => {

    const defaultSort = { field: 'alias', asc: true };

    const applications: IInsightApplication[] = [
        { alias: 'alias1', version: 'version1', description: 'description1', title: 'title3', biEngine: 'sisense' },
        { alias: 'alias2', version: 'version2', description: 'description2', title: 'title2', biEngine: 'sisense' }
    ];

    const applicationsPayload: IInsightApplication[] = [
        { alias: 'alias3', version: 'version3', description: 'description3', title: 'title3', biEngine: 'sisense' },
    ];

    it('get applications action returns a loading state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: [],
            loading: true
        }

        // act
        const newState: State = reducer(state, { type: GET_SELECTED_INSIGHT_APPLICATIONS })

        // assert
        expect(newState).toEqual(state);
        expect(isLoading(newState)).toBe(true);
        expect(getInsightApplications(newState)).toEqual([]);
        expect(isSubmitting(newState)).toBeFalsy();
        expect(isSubmitSuccessful(newState)).toBeFalsy();
        expect(getErrorMessage(newState)).toBeFalsy();
        expect(getSuccessMessage(newState)).toBeFalsy();
    }));

    it('get applications success action returns an success state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS, payload: applicationsPayload })

        // assert
        expect(newState.loading).toBe(false);
        expect(newState.insightApplications.length).toBe(3);
        expect(isLoading(newState)).toBe(false);
        expect(getInsightApplications(newState).length).toBe(3);
        expect(isSubmitting(newState)).toBeFalsy();
        expect(isSubmitSuccessful(newState)).toBeFalsy();
        expect(getErrorMessage(newState)).toBeFalsy();
        expect(getSuccessMessage(newState)).toBeFalsy();
    }));

    it('get applications fail action returns a failed state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: GET_SELECTED_INSIGHT_APPLICATIONS_FAIL, payload: applicationsPayload })

        // assert
        expect(newState.loading).toBe(false);
        expect(newState.insightApplications.length).toBe(2);
        expect(isLoading(newState)).toBe(false);
        expect(getInsightApplications(newState)).toEqual(state.insightApplications);
        expect(isSubmitting(newState)).toBeFalsy();
        expect(isSubmitSuccessful(newState)).toBeFalsy();
        expect(getErrorMessage(newState)).toBeTruthy();
        expect(getSuccessMessage(newState)).toBeFalsy();
    }));

    it('create insight applications action returns a submitting state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: CREATE_INSIGHT_APPLICATIONS })

        // assert
        expect(newState.loading).toBe(false);
        expect(newState.submitting).toBe(true);
        expect(isSubmitting(newState)).toBe(true);
    }));

    it('create insight applications success action returns a success state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: CREATE_INSIGHT_APPLICATIONS_SUCCESS })

        // assert
        expect(newState.submitting).toBe(false);
        expect(newState.submitSuccessful).toBe(true);
        expect(newState.successMessage).toBeTruthy();
        expect(isSubmitting(newState)).toBe(false);
        expect(isSubmitSuccessful(newState)).toBe(true);
        expect(getSuccessMessage(newState)).toBeTruthy();
        expect(getErrorMessage(newState)).toBeFalsy();
    }));

    it('create insight applications fail action returns a failed state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: CREATE_INSIGHT_APPLICATIONS_FAIL })

        // assert
        expect(newState.submitting).toBe(false);
        expect(newState.submitSuccessful).toBe(false);
        expect(newState.successMessage).toBeFalsy();
        expect(newState.errorMessage).toBeTruthy();
        expect(isSubmitting(newState)).toBe(false);
        expect(isSubmitSuccessful(newState)).toBe(false);
        expect(getSuccessMessage(newState)).toBeFalsy();
        expect(getErrorMessage(newState)).toBeTruthy();
    }));

    it('update insight applications action returns a submitting state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: UPDATE_INSIGHT_APPLICATIONS })

        // assert
        expect(newState.loading).toBe(false);
        expect(newState.submitting).toBe(true);
        expect(isSubmitting(newState)).toBe(true);
    }));

    it('update insight applications success action returns a success state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: UPDATE_INSIGHT_APPLICATIONS_SUCCESS })

        // assert
        expect(newState.submitting).toBe(false);
        expect(newState.submitSuccessful).toBe(true);
        expect(newState.successMessage).toBeTruthy();
        expect(isSubmitting(newState)).toBe(false);
        expect(isSubmitSuccessful(newState)).toBe(true);
        expect(getSuccessMessage(newState)).toBeTruthy();
        expect(getErrorMessage(newState)).toBeFalsy();
    }));

    it('update insight applications fail action returns a failed state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: UPDATE_INSIGHT_APPLICATIONS_FAIL })

        // assert
        expect(newState.submitting).toBe(false);
        expect(newState.submitSuccessful).toBe(false);
        expect(newState.successMessage).toBeFalsy();
        expect(newState.errorMessage).toBeTruthy();
        expect(isSubmitting(newState)).toBe(false);
        expect(isSubmitSuccessful(newState)).toBe(false);
        expect(getSuccessMessage(newState)).toBeFalsy();
        expect(getErrorMessage(newState)).toBeTruthy();
    }));

});
