/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { IOrganization } from './organization.models';
import { 
        GET_NEW_ORG,
        GET_ORG, GET_ORG_SUCCESS, GET_ORG_FAIL, 
        CREATE_ORG, CREATE_ORG_SUCCESS, CREATE_ORG_FAIL,
        UPDATE_ORG, UPDATE_ORG_SUCCESS, UPDATE_ORG_FAIL
    } from './organization.actions';
import { State, reducer, getOrganization, isSubmitting, isSubmitSuccessful, isLoading, getErrorMessage, getSuccessMessage } from './organization.reducer';

describe('organization.reducers', () => {
    
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

    const organizationPayload: IOrganization = Object.assign({}, organization, { id: 'id2', organizationName: 'organizationName2', apps: ['app1'] });    

    it('get new organization action returns a loading state',  async(() => {
        // arrange
        const state: State = {
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

        // act
        const newState: State = reducer(state, { type: GET_NEW_ORG })

        // assert            
        expect(newState).toEqual(state);
    })); 

    it('get organization action returns a loading state',  async(() => {
        // arrange
        const state: State = {
            loading: true,
        }

        // act
        const newState: State = reducer(state, { type: GET_ORG })

        // assert            
        expect(newState).toEqual(state);
        expect(isLoading(newState)).toBe(true);
    })); 

    it('get organization success action returns an success state',  async(() => {
        // arrange         
        const state: State = {
            organization: organization,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: GET_ORG_SUCCESS, payload: organizationPayload })

        // assert            
        expect(newState.loading).toBe(false);
        expect(isLoading(newState)).toBe(false);
        expect(getOrganization(newState)).toEqual(Object.assign({}, organizationPayload, { statusText: 'Enabled' }));
        expect(isSubmitting(newState)).toBeFalsy();
        expect(isSubmitSuccessful(newState)).toBeFalsy();
        expect(getErrorMessage(newState)).toBeFalsy();
        expect(getSuccessMessage(newState)).toBeFalsy();
    })); 

    it('get organization fail action returns a failed state',  async(() => {
        // arrange         
        const state: State = {
            organization: organization,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: GET_ORG_FAIL, payload: organizationPayload })

        // assert            
        expect(newState.loading).toBe(false);
        expect(isLoading(newState)).toBe(false);
        expect(getOrganization(newState)).toEqual(state.organization);
        expect(isSubmitting(newState)).toBeFalsy();
        expect(isSubmitSuccessful(newState)).toBeFalsy();
        expect(getErrorMessage(newState)).toBeTruthy();
        expect(getSuccessMessage(newState)).toBeFalsy();
    })); 

    it('create organization action returns a submitting state',  async(() => {
        // arrange         
        const state: State = {
            organization: organization,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: CREATE_ORG })

        // assert            
        expect(newState.loading).toBe(false);
        expect(newState.submitting).toBe(true);
        expect(isSubmitting(newState)).toBe(true);
    })); 

    it('create organization success action returns a success state',  async(() => {
        // arrange         
        const state: State = {
            organization: organization,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: CREATE_ORG_SUCCESS })

        // assert            
        expect(newState.submitting).toBe(false);
        expect(newState.submitSuccessful).toBe(true);
        expect(newState.successMessage).toBeTruthy();
        expect(isSubmitting(newState)).toBe(false);
        expect(isSubmitSuccessful(newState)).toBe(true);
        expect(getSuccessMessage(newState)).toBeTruthy();
        expect(getErrorMessage(newState)).toBeFalsy();
    })); 

    it('create organization fail action returns a failed state',  async(() => {
        // arrange         
        const state: State = {
            organization: organization,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: CREATE_ORG_FAIL })

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

    it('update organization action returns a submitting state',  async(() => {
        // arrange         
        const state: State = {
            organization: organization,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: UPDATE_ORG })

        // assert            
        expect(newState.loading).toBe(false);
        expect(newState.submitting).toBe(true);
        expect(isSubmitting(newState)).toBe(true);
    })); 

    it('update organization success action returns a success state',  async(() => {
        // arrange         
        const state: State = {
            organization: organization,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: UPDATE_ORG_SUCCESS })

        // assert            
        expect(newState.submitting).toBe(false);
        expect(newState.submitSuccessful).toBe(true);
        expect(newState.successMessage).toBeTruthy();
        expect(isSubmitting(newState)).toBe(false);
        expect(isSubmitSuccessful(newState)).toBe(true);
        expect(getSuccessMessage(newState)).toBeTruthy();
        expect(getErrorMessage(newState)).toBeFalsy();
    })); 

    it('update organization fail action returns a failed state',  async(() => {
        // arrange         
        const state: State = {
            organization: organization,
            loading: false
        }

        // act
        const newState: State = reducer(state, { type: UPDATE_ORG_FAIL })

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