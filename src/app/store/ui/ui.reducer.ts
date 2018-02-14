import { ActionReducer, Action } from '@ngrx/store';

import * as fromModels from './ui.models';
import { UPDATE_TOP_TAB, UpdateTopTabAction } from './ui.actions';

export interface State{
    uiState: fromModels.IUiState;
}

const defaultValue: State = {
    uiState: { topTab: 'orgs' }
};

export const reducer : ActionReducer<State> = (state: State = defaultValue, action: UpdateTopTabAction)=> {
    switch(action.type){
        case UPDATE_TOP_TAB:
            return Object.assign({}, state, { uiState: { topTab: action.payload } });            

        default:
            return state;
    }
}

export const getSelectedTopTab = (state: State)=> state.uiState.topTab
