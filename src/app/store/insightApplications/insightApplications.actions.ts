import { Action } from '@ngrx/store';

import { IInsightApplication } from './insightApplications.models';

export const GET_SELECTED_INSIGHT_APPLICATIONS = 'GET_SELECTED_INSIGHT_APPLICATIONS';
export const GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS = 'GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS';
export const GET_SELECTED_INSIGHT_APPLICATIONS_FAIL = 'GET_SELECTED_INSIGHT_APPLICATIONS_FAIL';

export const GET_INSIGHT_APPLICATIONS = 'GET_INSIGHT_APPLICATIONS';
export const GET_INSIGHT_APPLICATIONS_SUCCESS = 'GET_INSIGHT_APPLICATIONS_SUCCESS';
export const GET_INSIGHT_APPLICATIONS_FAIL = 'GET_INSIGHT_APPLICATIONS_FAIL';

export const CREATE_INSIGHT_APPLICATIONS = 'CREATE_INSIGHT_APPLICATIONS';
export const CREATE_INSIGHT_APPLICATIONS_SUCCESS = 'CREATE_INSIGHT_APPLICATIONS_SUCCESS';
export const CREATE_INSIGHT_APPLICATIONS_FAIL = 'CREATE_INSIGHT_APPLICATIONS_FAIL';

export const UPDATE_INSIGHT_APPLICATIONS = 'UPDATE_INSIGHT_APPLICATIONS';
export const UPDATE_INSIGHT_APPLICATIONS_SUCCESS = 'UPDATE_INSIGHT_APPLICATIONS_SUCCESS';
export const UPDATE_INSIGHT_APPLICATIONS_FAIL = 'UPDATE_INSIGHT_APPLICATIONS_FAIL';

export const SORT_INSIGHT_APPLICATIONS = 'SORT_INSIGHT_APPLICATIONS';

export class SortApplicationsAction implements Action {
    type = SORT_INSIGHT_APPLICATIONS;
    constructor(public payload: string) { }
}

export class GetInsightApplicationsAction implements Action {
    type = GET_INSIGHT_APPLICATIONS;
    constructor(public payload: IInsightApplication[]) { }
}

export class GetInsightApplicationsCompleteAction implements Action {
    type = GET_INSIGHT_APPLICATIONS_SUCCESS;
    constructor(public payload: IInsightApplication[]) { }
}

export class GetInsightApplicationsFailAction implements Action {
    type = GET_INSIGHT_APPLICATIONS_FAIL;
    constructor(public payload: string) { }
}

export class GetSelectedInsightApplicationsAction implements Action {
    type = GET_SELECTED_INSIGHT_APPLICATIONS;
    constructor(public payload: IInsightApplication[]) { }
}

export class GetSelectedInsightApplicationsCompleteAction implements Action {
    type = GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS;
    constructor(public payload: IInsightApplication[]) { }
}

export class GetSelectedInsightApplicationsFailAction implements Action {
    type = GET_SELECTED_INSIGHT_APPLICATIONS_FAIL;
    constructor(public payload: string) { }
}

export class CreateInsightApplicationsCompleteAction implements Action {
    type = CREATE_INSIGHT_APPLICATIONS_SUCCESS;
    constructor() { }
}

export class CreateInsightApplicationsFailAction implements Action {
    type = CREATE_INSIGHT_APPLICATIONS_FAIL;
    constructor(public payload: string) { }
}

export class UpdateInsightApplicationsCompleteAction implements Action {
    type = UPDATE_INSIGHT_APPLICATIONS_SUCCESS;
    constructor() { }
}

export class UpdateInsightApplicationsFailAction implements Action {
    type = UPDATE_INSIGHT_APPLICATIONS_FAIL;
    constructor(public payload: string) { }
}
