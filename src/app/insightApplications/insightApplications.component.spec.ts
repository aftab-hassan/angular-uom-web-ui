/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkStubDirective, RouterOutletStubComponent } from '../../test-stubs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UPDATE_TOP_TAB } from '../store/ui/ui.actions';
import { GET_INSIGHT_APPLICATIONS, SORT_INSIGHT_APPLICATIONS } from '../store/insightApplications/insightApplications.actions';
import { InsightApplicationsComponent } from './insightApplications.component';
import { InsightApplicationsFilterPipe } from './insightApplications.filter.pipe';

describe('InsightApplicationsComponent', () => {
  const userInfo = { userName: 'userName' };
  const tab = 'apps';
  const isLoading = true;
  const userCanEdit = true;
  const applications = [ 'app1', 'app2' ];
  const sortInfo = { field: 'id', asc: true };
  const errorMessage = 'errorMessage';
  const deleteApplicationSuccessMessage = 'success message upon deleting application';
  const deleteApplicationErrorMessage = 'error message upon unable to delete application';
  const deleteApplicationIsSubmitSuccessful = false;
  const isLoadingDeleteApplication = false;

  let storeMock, configMock;
  let counter = 0;
  const getStoreSelectValues = args=>{
        return Observable.of((()=> {
          switch(counter++ % 10){
            case 0: return userInfo;
            case 1: return isLoading;
            case 2: return userCanEdit;
            case 3: return applications;
            case 4: return sortInfo;
            case 5: return errorMessage;
            case 6: return deleteApplicationSuccessMessage;
            case 7: return deleteApplicationErrorMessage;
            case 8: return deleteApplicationIsSubmitSuccessful;
            case 9: return isLoadingDeleteApplication;
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
      declarations: [ InsightApplicationsComponent, InsightApplicationsFilterPipe, RouterLinkStubDirective, RouterOutletStubComponent ],
      providers: [
        { provide: Store, useValue: storeMock }
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the component', async(() => {
    // act
    const fixture = TestBed.createComponent(InsightApplicationsComponent);
    const app = fixture.debugElement.componentInstance;

    // assert
    expect(app).toBeTruthy();
  }));

  it('sort action should dispatch SORT_INSIGHT_APPLICATIONS action', async(() => {
    // arrange
    const fixture = TestBed.createComponent(InsightApplicationsComponent);
    const app = fixture.debugElement.componentInstance;
    const field = 'field';

    // act
    app.sort(field);

    // assert
    expect(storeMock.dispatch.calls.mostRecent().args).toEqual([{ type: SORT_INSIGHT_APPLICATIONS, payload: field }]);
  }));

  it('gets the sortby field class', async(() => {
    // arrange
    const fixture = TestBed.createComponent(InsightApplicationsComponent);
    const app = fixture.debugElement.componentInstance;
    const field = 'field';
    const sortInfo = { field: field, asc: true };

    // act
    const result = app.getSortByClass(sortInfo, field);

    // assert
    expect(result).toBe('sorted-by-column')
  }));


  it('gets the ascending sort direction class', async(() => {
    // arrange
    const fixture = TestBed.createComponent(InsightApplicationsComponent);
    const app = fixture.debugElement.componentInstance;
    const field = 'field';
    const sortInfo = { field: field, asc: true };

    // act
    const result = app.getSortDirectionClass(sortInfo, field);

    // assert
    expect(result).toBe('fa-sort-asc')
  }));


  it('gets the decending sort direction class', async(() => {
      // arrange
      const fixture = TestBed.createComponent(InsightApplicationsComponent);
      const app = fixture.debugElement.componentInstance;
      const field = 'field';
      const sortInfo = { field: field, asc: false };

      // act
      const result = app.getSortDirectionClass(sortInfo, field);

      // assert
      expect(result).toBe('fa-sort-desc')
    }));
});
