import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Http, Response } from '@angular/http';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ClientConfigService, HttpService } from 'ge-web-ui-lib/services';
import { Guid } from 'ge-web-ui-lib/common';
import { LogCompleteAction, LogFailAction } from 'ge-web-ui-lib/store';

import { IClientSettings } from '../../../../config';
import { GET_APPLICATIONS, GetApplicationsCompleteAction, GetApplicationsFailAction } from './applications.actions';

@Injectable()
export class ApplicationsEffects{
    constructor(private actions$: Actions, private http: HttpService, private configService: ClientConfigService){ }

    @Effect() applicationsGet$ = this.actions$
        .ofType(GET_APPLICATIONS)
        .switchMap((action: Action) => {
            const config: IClientSettings = <any>this.configService.value();
            const analyticsAppName = config.analyticsAppName;
            const requestUrl = `${config.api.endpoints.uom.url}/v1/org/${action.payload.id}/apps`;
            return this.http.get(requestUrl)
                .mergeMap((response: Response)=>
                    Observable.from([ 
                        new GetApplicationsCompleteAction({ 
                            applications: response.json(), 
                            analyticsAppName: analyticsAppName 
                        }),
                        new LogCompleteAction(response)
                    ])
                )
                .catch((error: Response)=> 
                     Observable.from([
                        new GetApplicationsFailAction(error.statusText),
                        new LogFailAction(error)
                        
                    ])
                );
        });
}