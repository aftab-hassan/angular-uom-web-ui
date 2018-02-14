/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { LogCompleteAction, LogFailAction } from 'ge-web-ui-lib/store';
import { UPDATE_APPLICATION_PACKAGE, UpdateApplicationPackageCompleteAction, UpdateApplicationPackageFailAction } from './applicationPackage.actions';
import { ApplicationPackageEffects } from './applicationPackage.effects';

describe('applicationPackage.effects', () => {
    let effect: ApplicationPackageEffects;

    let httpServiceObj;
    let configServiceSpyObj;
    let httpFileUploadServiceObj;

    let actionsSpyObj;
    let mergeMapSpy;
    let catchSpy;
    let catchSpy1;
    let switchMapSpy;

    const settings: any = { api: { endpoints: { manager: { url: 'url' } } } };
    const file: File = <any>{ parts: ['test content'], fileName: 'myfile.txt' };
    const uploadAction = { payload: { manifest: file, package: file } }

    beforeEach(() => {
        configServiceSpyObj = jasmine.createSpyObj('ClientConfigService', ['value']);
        configServiceSpyObj.value.and.returnValue(settings);

        mergeMapSpy = jasmine.createSpy('mergeMap');
        catchSpy = jasmine.createSpy('catch');
        mergeMapSpy.and.returnValue({ catch: catchSpy });

        httpServiceObj = jasmine.createSpyObj('HttpService', ['getRetry']);
        catchSpy1 = jasmine.createSpy('catch');
        httpServiceObj.getRetry.and.returnValue({ catch: catchSpy1 });

        httpFileUploadServiceObj = jasmine.createSpyObj('HttpFileUploadService', ['uploadFiles']);
        httpFileUploadServiceObj.uploadFiles.and.returnValue({ mergeMap: mergeMapSpy });

        actionsSpyObj = jasmine.createSpyObj('Actions', ['ofType']);
        switchMapSpy = jasmine.createSpy('switchMap');
        actionsSpyObj.ofType.and.returnValue({ switchMap: switchMapSpy });

        effect = new ApplicationPackageEffects(actionsSpyObj, httpServiceObj, httpFileUploadServiceObj, configServiceSpyObj)
    })

    it('upload action initialized', async(() => {
        // assert
        expect(actionsSpyObj.ofType).toHaveBeenCalledWith(UPDATE_APPLICATION_PACKAGE);
        expect(switchMapSpy).toHaveBeenCalledWith(jasmine.any(Function));
    }));

    it('upload http request has been initiated', async(() => {
        // act
        switchMapSpy.calls.mostRecent().args[0](uploadAction);
        let ud = undefined;

        // assert
        const url = `${settings.api.endpoints.manager.url}/v1/pbiapplications/${ud}/version/${ud}/import`;
        expect(configServiceSpyObj.value).toHaveBeenCalled();

        expect(httpFileUploadServiceObj.uploadFiles).toHaveBeenCalledWith(
            url,
            [ { name: 'package', file: uploadAction.payload.package } ]
        );
        expect(mergeMapSpy).toHaveBeenCalledWith(jasmine.any(Function));
        expect(catchSpy).toHaveBeenCalledWith(jasmine.any(Function));
    }));

    it('upload http request has succeeded', async(() => {
        // arrange
        const response = { data: {} }

        // act
        switchMapSpy.calls.mostRecent().args[0](uploadAction)
        const result = mergeMapSpy.calls.mostRecent().args[0](response)

        // assert
        expect(result.array[0].constructor.name).toBe(UpdateApplicationPackageCompleteAction.name)
        expect(result.array[1].constructor.name).toBe(LogCompleteAction.name)
    }));

    it('upload progress is not enabled', async(() => {
        // arrange
        const response = { type: 'progress', data: {} }

        // act
        switchMapSpy.calls.mostRecent().args[0](uploadAction)
        const result = mergeMapSpy.calls.mostRecent().args[0](response)

        // assert
        expect(result.constructor.name).toBe('EmptyObservable');
    }));

    it('upload http request has failed', async(() => {
        // arrange
        const response = { statusText: 'failed' }

        // act
        switchMapSpy.calls.mostRecent().args[0](uploadAction)
        catchSpy.calls.mostRecent().args[0](response)

        // assert
        expect(httpServiceObj.getRetry).toHaveBeenCalled()
        expect(catchSpy).toHaveBeenCalled()
    }));

    it('upload http request retry has failed', async(() => {
        // arrange
        const response = { statusText: 'failed' }

        // act
        switchMapSpy.calls.mostRecent().args[0](uploadAction)
        catchSpy.calls.mostRecent().args[0](response)
        const result = catchSpy1.calls.mostRecent().args[0](response)

        // assert
        expect(result.array[0].constructor.name).toBe(UpdateApplicationPackageFailAction.name)
        expect(result.array[1].constructor.name).toBe(LogFailAction.name)
    }));

});
