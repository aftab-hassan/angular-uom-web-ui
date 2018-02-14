/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { IApplication } from './applications.models';
import { GET_APPLICATIONS, GET_APPLICATIONS_SUCCESS, GET_APPLICATIONS_FAIL } from './applications.actions';
import { State, reducer, getApplications, isLoading, getErrorMessage } from './applications.reducer';

describe('applications.reducers', () => {
    
    const applications: IApplication[] = [
        { id: '0', name: 'name0', appRoles: [{ id: '0', name: 'name01' }] },
        { id: '1', name: 'name1', appRoles: [{ id: '1', name: 'name11' }] }  
    ]; 

    const analyticsAppName = 'Applied Intelligence';
    const applicationsPayload: IApplication[] = [
        { id: '2', name: analyticsAppName, appRoles: [{ id: '0', name: 'name21' }, { id: '1', name: 'name22' }] }
    ]; 

    it('get applications action returns a loading state',  async(() => {
        // arrange
        const state: State = {
            applications: [],   
            loading: true
        }

        // act
        const newState: State = reducer(state, { type: GET_APPLICATIONS })

        // assert            
        expect(newState).toEqual(state);
        expect(isLoading(newState)).toBe(true);
        expect(getApplications(newState)).toEqual([]);
        expect(getErrorMessage(newState)).toBeFalsy();
    })); 

    it('get applications success action returns an success state',  async(() => {
        // arrange         
        const state: State = {
            applications: applications,   
            loading: true
        }

        // act
        const newState: State = reducer(state, { 
            type: GET_APPLICATIONS_SUCCESS, 
            payload: { 
                applications: applicationsPayload,
                analyticsAppName: analyticsAppName
            }
        })

        // assert            
        expect(newState.loading).toBe(false);
        expect(newState.applications.length).toBe(3);
        expect(newState.applications.some(a=> a.isInsightsApp)).toBe(true);
        expect(isLoading(newState)).toBe(false);
        expect(getApplications(newState).length).toBe(3);
        expect(getErrorMessage(newState)).toBeFalsy();
    })); 

    it('get applications fail action returns a failed state',  async(() => {
        // arrange         
        const state: State = {
            applications: applications,   
            loading: true
        }

        // act
        const newState: State = reducer(state, { type: GET_APPLICATIONS_FAIL, payload: applicationsPayload })

        // assert            
        expect(newState.loading).toBe(false);
        expect(newState.applications.length).toBe(2);
        expect(isLoading(newState)).toBe(false);
        expect(getApplications(newState)).toEqual(state.applications);
        expect(getErrorMessage(newState)).toBeTruthy();
    })); 

});