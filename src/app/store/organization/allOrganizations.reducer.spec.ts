/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { IOrganization } from './organization.models';
import { GET_ORG_ALL, GET_ORG_ALL_SUCCESS, GET_ORG_ALL_FAIL, SORT_ORGS } from './organization.actions';
import { State, reducer, getOrganizations, getSortInfo, isLoading, getErrorMessage } from './allOrganizations.reducer';

describe('allOrganizations.reducers', () => {
    
    const defaultSort = { field: 'id', asc: true };
    
    const organization: IOrganization = {
        id: 'id',
        organizationName: 'organizationName',
        location: 'location',
        contact: 'contact',
        enabled: true,
        customerType: 'EXTERNAL',
        registrationPending: false,
        apps: ['app1', 'app2'],
        admins: [{ email: 'email1', name: 'name1' }, { email: 'email2', name: 'name2' }],
        tags: [{ name: 'name1', value: 'value1' }, { name: 'name2', value: 'value2' }] 
    };

    const organizations = [organization, Object.assign({}, organization, { id: 'id2', organizationName: 'organizationName2' })]

    const applicationsPayload: IOrganization[] = [
        Object.assign({}, organization, { id: 'id3', organizationName: 'organizationName3', apps: ['app1'] })
    ]; 

    it('get applications action returns a loading state',  async(() => {
        // arrange
        const state: State = {
            organizations: [],
            sortInfo: defaultSort,
            loading: true
        }

        // act
        const newState: State = reducer(state, { type: GET_ORG_ALL })

        // assert            
        expect(newState).toEqual(state);
        expect(isLoading(newState)).toBe(true);
        expect(getOrganizations(newState)).toEqual([]);
        expect(getErrorMessage(newState)).toBeFalsy();
        expect(getSortInfo(newState)).toEqual(defaultSort);
    })); 

    it('get applications success action returns an success state',  async(() => {
        // arrange         
        const state: State = {
            organizations: organizations,
            sortInfo: defaultSort,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: GET_ORG_ALL_SUCCESS, payload: applicationsPayload })

        // assert            
        expect(newState.loading).toBe(false);
        expect(newState.organizations.length).toBe(3);
        expect(isLoading(newState)).toBe(false);
        expect(getOrganizations(newState).length).toBe(3);
        expect(getErrorMessage(newState)).toBeFalsy();
    })); 

    it('get applications fail action returns a failed state',  async(() => {
        // arrange         
        const state: State = {
            organizations: organizations,
            sortInfo: defaultSort,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: GET_ORG_ALL_FAIL, payload: applicationsPayload })

        // assert            
        expect(newState.loading).toBe(false);
        expect(newState.organizations.length).toBe(2);
        expect(isLoading(newState)).toBe(false);
        expect(getOrganizations(newState)).toEqual(state.organizations);
        expect(getErrorMessage(newState)).toBeTruthy();
    })); 

    it('sort applications action returns a sorted state',  async(() => {
        // arrange         
        const state: State = {
            organizations: organizations,
            sortInfo: defaultSort,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: SORT_ORGS, payload: 'organizationName' })

        // assert            
        expect(newState.loading).toBe(false);
        expect(newState.organizations.length).toBe(2);
        expect(isLoading(newState)).toBe(false);
        expect(getOrganizations(newState)[0].organizationName).toBe('organizationName');
        expect(getOrganizations(newState)[1].organizationName).toBe('organizationName2');
        expect(getErrorMessage(newState)).toBeFalsy();
    })); 

});