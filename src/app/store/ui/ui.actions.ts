import { Action } from '@ngrx/store';

import { IUiState } from './ui.models';

export const UPDATE_TOP_TAB = 'UPDATE_TOP_TAB';

export class UpdateTopTabAction implements Action {
    type = UPDATE_TOP_TAB;
    constructor(public payload: IUiState) { }
}