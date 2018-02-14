import { Action } from '@ngrx/store';

import { IApplication } from './applications.models';

export const GET_APPLICATIONS = 'GET_APPLICATIONS';

export const GET_APPLICATIONS_SUCCESS = 'GET_APPLICATIONS_SUCCESS';

export const GET_APPLICATIONS_FAIL = 'GET_APPLICATIONS_FAIL';

export class GetApplicationsAction implements Action {
    type = GET_APPLICATIONS;
    constructor(public payload: IApplication[]) { }
}

export class GetApplicationsCompleteAction implements Action {
    type = GET_APPLICATIONS_SUCCESS;
    constructor(public payload: { applications: IApplication[], analyticsAppName: string }) { }
}

export class GetApplicationsFailAction implements Action {
    type = GET_APPLICATIONS_FAIL;
    constructor(public payload: string) { }
}