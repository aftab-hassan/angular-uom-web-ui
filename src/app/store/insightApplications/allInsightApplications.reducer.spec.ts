/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { IInsightApplication } from './insightApplications.models';
import { GET_INSIGHT_APPLICATIONS, GET_INSIGHT_APPLICATIONS_SUCCESS, GET_INSIGHT_APPLICATIONS_FAIL, SORT_INSIGHT_APPLICATIONS } from './insightApplications.actions';
import { State, reducer, getInsightApplications, getSortInfo, isLoading, getErrorMessage } from './allInsightApplications.reducer';

describe('allInsightApplications.reducers', () => {

    const defaultSort = { field: 'alias', asc: false };

    const applications: IInsightApplication[] = [
        { alias: 'alias3', version: 'version3', description: 'description1', title: 'title3', biEngine: 'sisense' },
        { alias: 'alias1', version: 'version1', description: 'description2', title: 'title2', biEngine: 'sisense' }
    ];

    const applicationsPayload: IInsightApplication[] = [
        { alias: 'alias2', version: 'version2', description: 'description3', title: 'title3', biEngine: 'sisense' },
    ];

    it('get applications action returns a loading state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: [],
            sortInfo: defaultSort,
            loading: true
        }

        // act
        const newState: State = reducer(state, { type: GET_INSIGHT_APPLICATIONS })

        // assert
        expect(newState).toEqual(state);
        expect(isLoading(newState)).toBe(true);
        expect(getInsightApplications(newState)).toEqual([]);
        expect(getErrorMessage(newState)).toBeFalsy();
        expect(getSortInfo(newState)).toEqual(defaultSort);
    }));

    it('get applications success action returns an success state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            sortInfo: defaultSort,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: GET_INSIGHT_APPLICATIONS_SUCCESS, payload: applicationsPayload })

        // assert
        expect(newState.loading).toBe(false);
        expect(newState.insightApplications.length).toBe(3);
        expect(newState.insightApplications[0].alias).toBe('alias1');
        expect(newState.insightApplications[1].alias).toBe('alias2');
        expect(isLoading(newState)).toBe(false);
        expect(getInsightApplications(newState).length).toBe(3);
        expect(getErrorMessage(newState)).toBeFalsy();
    }));

    it('get applications fail action returns a failed state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            sortInfo: defaultSort,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: GET_INSIGHT_APPLICATIONS_FAIL, payload: applicationsPayload })

        // assert
        expect(newState.loading).toBe(false);
        expect(newState.insightApplications.length).toBe(2);
        expect(isLoading(newState)).toBe(false);
        expect(getInsightApplications(newState)).toEqual(state.insightApplications);
        expect(getErrorMessage(newState)).toBeTruthy();
    }));

    it('sort applications action returns a sorted state',  async(() => {
        // arrange
        const state: State = {
            insightApplications: applications,
            sortInfo: defaultSort,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: SORT_INSIGHT_APPLICATIONS, payload: 'title' })

        // assert
        expect(newState.loading).toBe(false);
        expect(newState.insightApplications.length).toBe(2);
        expect(isLoading(newState)).toBe(false);
        expect(getInsightApplications(newState)[0].title).toBe('title2');
        expect(getInsightApplications(newState)[1].title).toBe('title3');
        expect(getErrorMessage(newState)).toBeFalsy();
    }));

});
