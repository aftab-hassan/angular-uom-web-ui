/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UploadInsightApplicationComponent } from './insightApplication.upload.component';
import { UPDATE_APPLICATION_PACKAGE, UPDATE_APPLICATION_PACKAGE_SUCCESS, UPDATE_APPLICATION_PACKAGE_FAIL } from '../../store/applicationPackage/applicationPackage.actions';

describe('UploadInsightApplicationComponent', () => {
  const userInfo = { userName: 'userName' };
  const tab = 'apps';
  const isLoading = true;
  const userCanEdit = true;
  const applications = [ 'app1', 'app2' ];
  const sortInfo = { field: 'id', asc: true };
  const errorMessage = 'errorMessage';

  let storeMock, configMock;
  let counter = 0;
  const getStoreSelectValues = args=>{
        return Observable.of((()=> {
          switch(counter++ % 6){
            case 0: return userInfo;
            case 1: return isLoading;
            case 2: return userCanEdit;
            case 3: return applications;
            case 4: return sortInfo;
            case 5: return errorMessage;
          }
        })());
    }

    beforeEach(() => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    storeMock.select.and.callFake(getStoreSelectValues);
    configMock = jasmine.createSpyObj('ClientConfigService', ['value']);
    configMock.value.and.returnValue( { isAdminApp: true });

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ UploadInsightApplicationComponent ],
      providers: [
        { provide: Store, useValue: storeMock }
      ],
    });
    TestBed.compileComponents();
  });

  it('submit form should dispatch UPDATE_APPLICATION_PACKAGE action', async(() => {
    // arrange
    const fixture = TestBed.createComponent(UploadInsightApplicationComponent);
    const app = fixture.debugElement.componentInstance;
    app.applicationName = 'applicationName';
    app.applicationEngine = 'applicationEngine';
    app.versionNumber = 'versionNumber';
    app.package = 'package';

    // act
    app.submitForm();

    // assert
    expect(storeMock.dispatch.calls.mostRecent().args).toEqual([{ type: UPDATE_APPLICATION_PACKAGE, payload: { package : 'package', applicationName : 'applicationName', applicationEngine : 'applicationEngine', versionNumber : 'versionNumber' } }]);
  }));

});
