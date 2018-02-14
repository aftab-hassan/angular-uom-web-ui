import { Action } from '@ngrx/store';

export const DELETE_APPLICATION = 'DELETE_APPLICATION';
export const DELETE_APPLICATION_SUCCESS = 'DELETE_APPLICATION_SUCCESS';
export const DELETE_APPLICATION_FAIL = 'DELETE_APPLICATION_FAIL';
export const DELETE_APPLICATION_SET_AS_DEFAULT = 'DELETE_APPLICATION_SET_AS_DEFAULT';

export class DeleteApplicationCompleteAction implements Action {
    type = DELETE_APPLICATION_SUCCESS;
    constructor(public payload: any) { }
}

export class DeleteApplicationFailAction implements Action {
    type = DELETE_APPLICATION_FAIL;
    constructor(public payload: any) { }
}
