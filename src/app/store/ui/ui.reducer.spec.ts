/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { IUiState } from './ui.models';
import { UPDATE_TOP_TAB } from './ui.actions';
import { State, reducer, getSelectedTopTab } from './ui.reducer';

describe('ui.reducers', () => {
    
    it('get ui state action returns a ui state',  async(() => {
        // arrange
        const tab = 'orgs';
        const state: State = {
           uiState: { topTab: 'apps' }
        }

        // act
        const newState: State = reducer(state, { type: UPDATE_TOP_TAB, payload: tab })

        // assert            
        expect(getSelectedTopTab(newState)).toEqual(tab);
    })); 

});