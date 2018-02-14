/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { 
        UpdateApplicationPackageCompleteAction, UpdateApplicationPackageFailAction, 
        UPDATE_APPLICATION_PACKAGE_SUCCESS, UPDATE_APPLICATION_PACKAGE_FAIL 
    } from './applicationPackage.actions';

describe('applicationPackage.actions', () => {
    
    it('creates UpdateApplicationPackageCompleteAction',  async(() => {
        // arrange
        let payload = { id: 10, name: 'name' }; 

        // act
        const action = new UpdateApplicationPackageCompleteAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(UPDATE_APPLICATION_PACKAGE_SUCCESS);   
    }));  

    it('creates UpdateApplicationPackageFailAction',  async(() => {
        // arrange
        let payload = { id: 10, name: 'name' }; 

        // act
        const action = new UpdateApplicationPackageFailAction(payload);

        // assert            
        expect(action.payload).toEqual(payload);   
        expect(action.type).toEqual(UPDATE_APPLICATION_PACKAGE_FAIL);   
    }));  

});