/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { IApplication } from './applications.models';
import { 
        GET_APPLICATIONS, GET_APPLICATIONS_SUCCESS, GET_APPLICATIONS_FAIL, 
        GetApplicationsAction, GetApplicationsCompleteAction, GetApplicationsFailAction
     } from './applications.actions';

describe('applications.actions', () => {
    
    it('creates GetApplicationsAction',  async(() => {
        // arrange
        const payload: IApplication[] = [
            { id: '0', name: 'name0', appRoles: [{ id: '0', name: 'name01' }] , isInsightsApp: false },
            { id: '1', name: 'name1', appRoles: [{ id: '1', name: 'name11' }] , isInsightsApp: true }  
        ]; 

        // act
        const action = new GetApplicationsAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(GET_APPLICATIONS);   
    }));  

    it('creates GetApplicationsCompleteAction',  async(() => {
        // arrange
        const payload: { applications: IApplication[], analyticsAppName: string } = {
            applications : [
                { id: '0', name: 'name0', appRoles: [{ id: '0', name: 'name01' }] , isInsightsApp: false },
                { id: '1', name: 'name1', appRoles: [{ id: '1', name: 'name11' }] , isInsightsApp: true }  
            ],
            analyticsAppName: 'analyticsAppName'
        }; 

        // act
        const action = new GetApplicationsCompleteAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(GET_APPLICATIONS_SUCCESS);   
    }));  

    it('creates GetApplicationsCompleteAction',  async(() => {
        // arrange
        const payload = 'error message';

        // act
        const action = new GetApplicationsFailAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(GET_APPLICATIONS_FAIL);   
    }));  

});