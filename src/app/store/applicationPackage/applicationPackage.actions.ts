import { Action } from '@ngrx/store';

import { IApplicationPackage } from './applicationPackage.models';

export const UPDATE_APPLICATION_PACKAGE = 'UPDATE_APPLICATION_PACKAGE';
export const UPDATE_APPLICATION_PACKAGE_SUCCESS = 'UPDATE_APPLICATION_PACKAGE_SUCCESS';
export const UPDATE_APPLICATION_PACKAGE_FAIL = 'UPDATE_APPLICATION_PACKAGE_FAIL';
export const UPDATE_APPLICATION_PACKAGE_SET_DEFAULT_STATE = 'UPDATE_APPLICATION_PACKAGE_SET_DEFAULT_STATE';

export class UpdateApplicationPackageCompleteAction implements Action {
    type = UPDATE_APPLICATION_PACKAGE_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateApplicationPackageFailAction implements Action {
    type = UPDATE_APPLICATION_PACKAGE_FAIL;
    constructor(public payload: any) { }
}
