import { Action } from '@ngrx/store';

import { IOrganization } from './organization.models';

export const GET_NEW_ORG = 'GET_NEW_ORG';

export const GET_ORG_ALL = 'GET_ORG_ALL';
export const GET_ORG_ALL_SUCCESS = 'GET_ORG_ALL_SUCCESS';
export const GET_ORG_ALL_FAIL = 'GET_ORG_ALL_FAIL';

export const GET_ORG = 'GET_ORG';
export const GET_ORG_SUCCESS = 'GET_ORG_SUCCESS';
export const GET_ORG_FAIL = 'GET_ORG_FAIL';

export const CREATE_ORG = 'CREATE_ORG';
export const CREATE_ORG_SUCCESS = 'CREATE_ORG_SUCCESS';
export const CREATE_ORG_FAIL = 'CREATE_ORG_FAIL';

export const UPDATE_ORG = 'UPDATE_ORG';
export const UPDATE_ORG_SUCCESS = 'UPDATE_ORG_SUCCESS';
export const UPDATE_ORG_FAIL = 'UPDATE_ORG_FAIL';

export const SORT_ORGS = 'SORT_ORGS';

export class GetNewOrganizationAction implements Action {
    type = GET_NEW_ORG;
    constructor(public payload: IOrganization) { }
}

export class SortOrganizationsAction implements Action {
    type = SORT_ORGS;
    constructor(public payload: string) { }
}

export class GetOrganizationAction implements Action {
    type = GET_ORG;
    constructor(public payload: IOrganization) { }
}

export class GetOrganizationCompleteAction implements Action {
    type = GET_ORG_SUCCESS;
    constructor(public payload: IOrganization) { }
}

export class GetOrganizationFailAction implements Action {
    type = GET_ORG_FAIL;
    constructor(public payload: string) { }
}

export class GetAllOrganizationsAction implements Action {
    type = GET_ORG_ALL;
    constructor(public payload: IOrganization[]) { }
}

export class GetAllOrganizationsCompleteAction implements Action {
    type = GET_ORG_ALL_SUCCESS;
    constructor(public payload: IOrganization[]) { }
}

export class GetAllOrganizationsFailAction implements Action {
    type = GET_ORG_ALL_FAIL;
    constructor(public payload: string) { }
}

export class CreateOrganizationCompleteAction implements Action {
    type = CREATE_ORG_SUCCESS;
    constructor(public payload: IOrganization) { }
}

export class CreaterOganizationFailAction implements Action {
    type = CREATE_ORG_FAIL;
    constructor(public payload: string) { }
}

export class UpdateOrganizationCompleteAction implements Action {
    type = UPDATE_ORG_SUCCESS;
    constructor(public payload: IOrganization) { }
}

export class UpdateOrganizationFailAction implements Action {
    type = UPDATE_ORG_FAIL;
    constructor(public payload: string) { }
}