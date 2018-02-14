/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { IUiState } from './ui.models';
import { UPDATE_TOP_TAB, UpdateTopTabAction } from './ui.actions';

describe('ui.actions', () => {
    
    it('creates UpdateTopTabAction',  async(() => {
        // arrange 
        const uiState: IUiState = { topTab: 'orgs' }

        // act
        const action = new UpdateTopTabAction(uiState);

        // assert            
        expect(action.payload).toEqual(uiState);   
        expect(action.type).toEqual(UPDATE_TOP_TAB);   
    }));  

});