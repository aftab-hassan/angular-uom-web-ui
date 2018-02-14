/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { IOrganization } from './organization.models';
import { 
        GET_NEW_ORG, SORT_ORGS,
        GET_ORG, GET_ORG_SUCCESS, GET_ORG_FAIL,
        GET_ORG_ALL, GET_ORG_ALL_SUCCESS, GET_ORG_ALL_FAIL,
        CREATE_ORG_SUCCESS, CREATE_ORG_FAIL,        
        UPDATE_ORG_SUCCESS, UPDATE_ORG_FAIL,
        GetNewOrganizationAction, SortOrganizationsAction,
        GetOrganizationAction, GetOrganizationCompleteAction, GetOrganizationFailAction,
        GetAllOrganizationsAction, GetAllOrganizationsCompleteAction, GetAllOrganizationsFailAction,
        CreateOrganizationCompleteAction, CreaterOganizationFailAction,
        UpdateOrganizationCompleteAction, UpdateOrganizationFailAction
     } from './organization.actions';

describe('organization.actions', () => {
    
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

    const organizations = [organization, Object.assign({}, organization, { id: 'id2' })]

    it('creates GetNewOrganizationAction',  async(() => {
        // act
        const action = new GetNewOrganizationAction(organization);

        // assert            
        expect(action.payload).toEqual(organization);   
        expect(action.type).toEqual(GET_NEW_ORG);   
    }));  

    it('creates SortOrganizationsAction',  async(() => {
        // arrange 
        const payload = 'location';

        // act
        const action = new SortOrganizationsAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(SORT_ORGS);   
    }));  

   it('creates GetOrganizationAction',  async(() => {       
        // act
        const action = new GetOrganizationAction(organization);

        // assert            
        expect(action.payload).toEqual(organization);   
        expect(action.type).toEqual(GET_ORG);   
    })); 

    it('creates GetOrganizationCompleteAction',  async(() => {       
        // act
        const action = new GetOrganizationCompleteAction(organization);

        // assert            
        expect(action.payload).toEqual(organization);   
        expect(action.type).toEqual(GET_ORG_SUCCESS);   
    })); 

    it('creates GetOrganizationFailAction',  async(() => {   
         // arrange 
        const payload = 'error';

        // act
        const action = new GetOrganizationFailAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(GET_ORG_FAIL);   
    })); 

    it('creates GetAllOrganizationsAction',  async(() => {       
        // act
        const action = new GetAllOrganizationsAction(organizations);

        // assert            
        expect(action.payload).toEqual(organizations);   
        expect(action.type).toEqual(GET_ORG_ALL);   
    })); 

    it('creates GetAllOrganizationsCompleteAction',  async(() => {       
        // act
        const action = new GetAllOrganizationsCompleteAction(organizations);

        // assert            
        expect(action.payload).toEqual(organizations);   
        expect(action.type).toEqual(GET_ORG_ALL_SUCCESS);   
    })); 

    it('creates GetAllOrganizationsFailAction',  async(() => {   
         // arrange 
        const payload = 'error';

        // act
        const action = new GetAllOrganizationsFailAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(GET_ORG_ALL_FAIL);   
    })); 

    it('creates CreateOrganizationCompleteAction',  async(() => {       
        // act
        const action = new CreateOrganizationCompleteAction(organization);

        // assert            
        expect(action.payload).toEqual(organization);   
        expect(action.type).toEqual(CREATE_ORG_SUCCESS);   
    })); 

    it('creates CreaterOganizationFailAction',  async(() => {   
         // arrange 
        const payload = 'error';

        // act
        const action = new CreaterOganizationFailAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(CREATE_ORG_FAIL);   
    })); 

    it('creates UpdateOrganizationCompleteAction',  async(() => {       
        // act
        const action = new UpdateOrganizationCompleteAction(organization);

        // assert            
        expect(action.payload).toEqual(organization);   
        expect(action.type).toEqual(UPDATE_ORG_SUCCESS);   
    })); 

    it('creates UpdateOrganizationFailAction',  async(() => {   
         // arrange 
        const payload = 'error';

        // act
        const action = new UpdateOrganizationFailAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(UPDATE_ORG_FAIL);   
    })); 

});