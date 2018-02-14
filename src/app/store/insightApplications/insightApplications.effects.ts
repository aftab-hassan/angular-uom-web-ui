import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http, Response, RequestMethod } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ClientConfigService, HttpService } from 'ge-web-ui-lib/services';
import { Guid } from 'ge-web-ui-lib/common';
import { LogCompleteAction, LogFailAction } from 'ge-web-ui-lib/store';

import { GET_INSIGHT_APPLICATIONS, GET_SELECTED_INSIGHT_APPLICATIONS, CREATE_INSIGHT_APPLICATIONS, UPDATE_INSIGHT_APPLICATIONS,
         GetInsightApplicationsCompleteAction, GetInsightApplicationsFailAction,
         GetSelectedInsightApplicationsCompleteAction, GetSelectedInsightApplicationsFailAction,
         CreateInsightApplicationsCompleteAction, CreateInsightApplicationsFailAction,
         UpdateInsightApplicationsCompleteAction, UpdateInsightApplicationsFailAction
     } from './insightApplications.actions';
import { IClientSettings } from '../../../../config';


@Injectable()
export class InsightApplicationsEffects{
    constructor(private actions$: Actions, private http: HttpService, private configService: ClientConfigService){ }

    @Effect() allApplicationsGet$ = this.actions$
        .ofType(GET_INSIGHT_APPLICATIONS)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            return this.http.get(`${config.api.endpoints.manager.url}/applications`)
                .mergeMap((response: Response)=>
                    Observable.from([ 
                        new GetInsightApplicationsCompleteAction(response.json()),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=> 
                     Observable.from([
                        new GetInsightApplicationsFailAction(error.statusText),
                        new LogFailAction(error)
                        
                    ])
                );
        });

    @Effect() selectedApplicationsGet$ = this.actions$
        .ofType(GET_SELECTED_INSIGHT_APPLICATIONS)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            return this.http.get(`${config.api.endpoints.manager.url}/v1/organizations/${action.payload.id}/applications`)
                .mergeMap((response: Response)=>
                    Observable.from([ 
                        new GetSelectedInsightApplicationsCompleteAction(response.json()),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=> 
                     Observable.from([
                        new GetSelectedInsightApplicationsFailAction(error.statusText),
                        new LogFailAction(error)
                        
                    ])
                );
        });

    @Effect() createInsightApplications$ = this.actions$
        .ofType(CREATE_INSIGHT_APPLICATIONS)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            return this.http.request(`${config.api.endpoints.manager.url}/v1/organizations/${action.payload.id}/applications`, { method: RequestMethod.Patch, body: action.payload.applications })
                .mergeMap((response: Response)=>
                    Observable.from([ 
                        new CreateInsightApplicationsCompleteAction(),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=> 
                     Observable.from([
                        new CreateInsightApplicationsFailAction(error.statusText),
                        new LogFailAction(error)                        
                    ])
                );
        });

    @Effect() updateInsightApplications$ = this.actions$
        .ofType(UPDATE_INSIGHT_APPLICATIONS)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            return this.http.request(`${config.api.endpoints.manager.url}/v1/organizations/${action.payload.id}/applications`, { method: RequestMethod.Patch, body: action.payload.applications })
                .mergeMap((response: Response)=>
                    Observable.from([ 
                        new UpdateInsightApplicationsCompleteAction(),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=> 
                     Observable.from([
                        new UpdateInsightApplicationsFailAction(error.statusText),
                        new LogFailAction(error)                        
                    ])
                );
        });
}