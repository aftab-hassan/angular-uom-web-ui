import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http, Response, RequestMethod } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ClientConfigService, HttpService } from 'ge-web-ui-lib/services';
import { Guid } from 'ge-web-ui-lib/common';
import { LogCompleteAction, LogFailAction } from 'ge-web-ui-lib/store';

import { IClientSettings } from '../../../../config';
import { DELETE_APPLICATION, DELETE_APPLICATION_SUCCESS, DELETE_APPLICATION_FAIL, DeleteApplicationCompleteAction, DeleteApplicationFailAction } from './deleteapplication.actions';

@Injectable()
export class DeleteApplicationEffects{
    constructor(private actions$: Actions, private http: HttpService, private configService: ClientConfigService){ }

    @Effect() applicationsDelete$ = this.actions$
        .ofType(DELETE_APPLICATION)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            const analyticsAppName = config.analyticsAppName;

            let requestUrl: string = ''
            if(`${action.payload.applicationEngine}` === 'powerbi')
            {
              requestUrl = `${config.api.endpoints.manager.url}/v1/pbiapplications/${action.payload.applicationName}/version/${action.payload.versionNumber}`;
            }

            else
            {
              requestUrl = `${config.api.endpoints.manager.url}/v1/applications/${action.payload.applicationName}/version/${action.payload.versionNumber}`;
            }

            return this.http.request(requestUrl, {method : RequestMethod.Delete })
                .mergeMap((response: Response)=>
                    Observable.from([
                        new DeleteApplicationCompleteAction({}),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=>
                     Observable.from([
                        new DeleteApplicationFailAction(error),
                        new LogFailAction(error)

                    ])
                );
        });
}
