/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';

import { IInsightApplication } from './insightApplications.models';
import {
       CREATE_INSIGHT_APPLICATIONS_SUCCESS, CREATE_INSIGHT_APPLICATIONS_FAIL,
       UPDATE_INSIGHT_APPLICATIONS_SUCCESS, UPDATE_INSIGHT_APPLICATIONS_FAIL,
       GET_INSIGHT_APPLICATIONS, GET_INSIGHT_APPLICATIONS_SUCCESS, GET_INSIGHT_APPLICATIONS_FAIL,
       GET_SELECTED_INSIGHT_APPLICATIONS, GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS, GET_SELECTED_INSIGHT_APPLICATIONS_FAIL,
       SORT_INSIGHT_APPLICATIONS,
       CreateInsightApplicationsCompleteAction, CreateInsightApplicationsFailAction,
       UpdateInsightApplicationsCompleteAction, UpdateInsightApplicationsFailAction,
       GetInsightApplicationsAction, GetInsightApplicationsCompleteAction, GetInsightApplicationsFailAction,
       GetSelectedInsightApplicationsAction, GetSelectedInsightApplicationsCompleteAction, GetSelectedInsightApplicationsFailAction,
       SortApplicationsAction
     } from './insightApplications.actions';

describe('insightApplications.actions', () => {
    const application: IInsightApplication = {
        alias: 'alias',
        version: 'version',
        description: 'description',
        title: 'title',
        biEngine : 'sisense'
    };

    const applications: IInsightApplication[] = [application, Object.assign(application, { alias: 'alias1' })]

    it('creates SortApplicationsAction',  async(() => {
        // arrange
        const field = 'field';

        // act
        const action = new SortApplicationsAction(field);

        // assert
        expect(action.payload).toEqual(field);
        expect(action.type).toEqual(SORT_INSIGHT_APPLICATIONS);
    }));

    it('creates CreateInsightApplicationsCompleteAction',  async(() => {
        // act
        const action = new CreateInsightApplicationsCompleteAction();

        // assert
        expect(action.type).toEqual(CREATE_INSIGHT_APPLICATIONS_SUCCESS);
    }));

    it('creates CreateInsightApplicationsFailAction',  async(() => {
        // arrange
        const payload = 'error message';

        // act
        const action = new CreateInsightApplicationsFailAction(payload);

        // assert
        expect(action.payload).toEqual(payload);
        expect(action.type).toEqual(CREATE_INSIGHT_APPLICATIONS_FAIL);
    }));

    it('creates UpdateInsightApplicationsCompleteAction',  async(() => {
        // act
        const action = new UpdateInsightApplicationsCompleteAction();

        // assert
        expect(action.type).toEqual(UPDATE_INSIGHT_APPLICATIONS_SUCCESS);
    }));

    it('creates UpdateInsightApplicationsFailAction',  async(() => {
        // arrange
        const payload = 'error message';

        // act
        const action = new UpdateInsightApplicationsFailAction(payload);

        // assert
        expect(action.payload).toEqual(payload);
        expect(action.type).toEqual(UPDATE_INSIGHT_APPLICATIONS_FAIL);
    }));

    it('creates GetInsightApplicationsAction',  async(() => {
        // act
        const action = new GetInsightApplicationsAction(applications);

        // assert
        expect(action.payload).toEqual(applications);
        expect(action.type).toEqual(GET_INSIGHT_APPLICATIONS);
    }));

    it('creates GetInsightApplicationsCompleteAction',  async(() => {
        // act
        const action = new GetInsightApplicationsCompleteAction(applications);

        // assert
        expect(action.payload).toEqual(applications);
        expect(action.type).toEqual(GET_INSIGHT_APPLICATIONS_SUCCESS);
    }));

    it('creates GetInsightApplicationsAction',  async(() => {
         // arrange
        const payload = 'error message';

        // act
        const action = new GetInsightApplicationsFailAction(payload);

        // assert
        expect(action.payload).toEqual(payload);
        expect(action.type).toEqual(GET_INSIGHT_APPLICATIONS_FAIL);
    }));

    it('creates GetSelectedInsightApplicationsAction',  async(() => {
        // act
        const action = new GetSelectedInsightApplicationsAction(applications);

        // assert
        expect(action.payload).toEqual(applications);
        expect(action.type).toEqual(GET_SELECTED_INSIGHT_APPLICATIONS);
    }));

    it('creates GetSelectedInsightApplicationsCompleteAction',  async(() => {
        // act
        const action = new GetSelectedInsightApplicationsCompleteAction(applications);

        // assert
        expect(action.payload).toEqual(applications);
        expect(action.type).toEqual(GET_SELECTED_INSIGHT_APPLICATIONS_SUCCESS);
    }));

    it('creates GetSelectedInsightApplicationsFailAction',  async(() => {
         // arrange
        const payload = 'error message';

        // act
        const action = new GetSelectedInsightApplicationsFailAction(payload);

        // assert
        expect(action.payload).toEqual(payload);
        expect(action.type).toEqual(GET_SELECTED_INSIGHT_APPLICATIONS_FAIL);
    }));

});
