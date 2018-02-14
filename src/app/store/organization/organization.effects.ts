import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http, Response, RequestMethod } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ClientConfigService, HttpService } from 'ge-web-ui-lib/services';
import { Guid } from 'ge-web-ui-lib/common';
import { LogCompleteAction, LogFailAction } from 'ge-web-ui-lib/store';

import { IClientSettings } from '../../../../config';
import { GET_ORG, GET_ORG_ALL, CREATE_ORG, UPDATE_ORG,
         GetOrganizationCompleteAction, GetOrganizationFailAction, 
         GetAllOrganizationsCompleteAction, GetAllOrganizationsFailAction,
         CreateOrganizationCompleteAction, CreaterOganizationFailAction,
         UpdateOrganizationCompleteAction, UpdateOrganizationFailAction
       } from './organization.actions';


@Injectable()
export class OrganizationEffects{
    constructor(private actions$: Actions, private http: HttpService, private configService: ClientConfigService){ }

    @Effect() getAllOrganizations$ = this.actions$
        .ofType(GET_ORG_ALL)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            return this.http.get(`${config.api.endpoints.uom.url}/v1/org`)
                .mergeMap((response: Response)=>
                    Observable.from([ 
                        new GetAllOrganizationsCompleteAction(response.json()),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=> 
                     Observable.from([
                        new GetAllOrganizationsFailAction(error.statusText),
                        new LogFailAction(error)                        
                    ])
                );
        });


    @Effect() getOrganization$ = this.actions$
        .ofType(GET_ORG)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            return this.http.get(`${config.api.endpoints.uom.url}/v1/org/${action.payload.id}`)
                .mergeMap((response: Response)=>
                    Observable.from([ 
                        new GetOrganizationCompleteAction(response.json()),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=> 
                     Observable.from([
                        new GetOrganizationFailAction(error.statusText),
                        new LogFailAction(error)                        
                    ])
                );
        });

    @Effect() createOrganization$ = this.actions$
        .ofType(CREATE_ORG)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            return this.http.request(`${config.api.endpoints.uom.url}/v1/org`, { method: RequestMethod.Post, body: action.payload })
                .mergeMap((response: Response)=>
                    Observable.from([ 
                        new CreateOrganizationCompleteAction(response.json()),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=> 
                     Observable.from([
                        new CreaterOganizationFailAction(error.statusText),
                        new LogFailAction(error)                        
                    ])
                );
        });

    @Effect() updateOrganization$ = this.actions$
        .ofType(UPDATE_ORG)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            return this.http.request(`${config.api.endpoints.uom.url}/v1/org/${action.payload.id}`, { method: RequestMethod.Put, body: action.payload })
                .mergeMap((response: Response)=>
                    Observable.from([ 
                        new UpdateOrganizationCompleteAction(response.json()),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=> 
                     Observable.from([
                        new UpdateOrganizationFailAction(error.statusText),
                        new LogFailAction(error)                        
                    ])
                );
        });
}