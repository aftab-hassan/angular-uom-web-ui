import { Injectable, Inject } from '@angular/core';
import { Observable, AsyncSubject } from 'rxjs';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ClientConfigService, HttpService, HttpFileUploadService, IUploadFile } from 'ge-web-ui-lib/services';
import { IClientSettings } from 'ge-web-ui-lib/common';
import { LogCompleteAction, LogFailAction } from 'ge-web-ui-lib/store';

import { UPDATE_APPLICATION_PACKAGE, UpdateApplicationPackageCompleteAction, UpdateApplicationPackageFailAction } from './applicationPackage.actions';


@Injectable()
export class ApplicationPackageEffects{

    constructor(private actions$: Actions, private httpService: HttpService, private httpFileUploadService: HttpFileUploadService, private configService: ClientConfigService){ }

    @Effect() updateApplicationPackage$ = this.actions$
        .ofType(UPDATE_APPLICATION_PACKAGE)
        .switchMap((action: Action) => {
            const config: IClientSettings = this.configService.value();

            const debugstring: string = `${action.payload.applicationEngine}`;

            let uri: string = ''
            if(`${action.payload.applicationEngine}` === 'sisense')
            {
              uri = `${config.api.endpoints.manager.url}/v1/applications/${action.payload.applicationName}/version/${action.payload.versionNumber}/import`;
            }

            else
            {
              uri = `${config.api.endpoints.manager.url}/v1/pbiapplications/${action.payload.applicationName}/version/${action.payload.versionNumber}/import`;
            }

            const files: Array<IUploadFile> = [
                { name: 'package', file: action.payload.package }
            ];

            return this.httpFileUploadService.uploadFiles(uri, files)
                .mergeMap((response: any)=> {
                        if(!response.type) {
                            return Observable.from([
                                new UpdateApplicationPackageCompleteAction(response),
                                new LogCompleteAction(response)
                            ])
                        }

                        return Observable.empty()
                    }
                )
                .catch((error, ob)=> {
                    return this.httpService.getRetry(error, ob)
                            .catch(e=> this.getErrors(error))
                });
        });

    private getErrors(error): Observable<{}> {
        return Observable.from([
            new UpdateApplicationPackageFailAction(error),
            new LogFailAction(error)
        ])
    }
}
