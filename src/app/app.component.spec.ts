/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkStubDirective, RouterOutletStubComponent } from '../test-stubs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ClientConfigService } from 'ge-web-ui-lib/services';

import { UPDATE_TOP_TAB } from './store/ui/ui.actions';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const userInfo = { userName: 'userName' };
  const tab ='apps';
  let storeMock, configMock;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    let counter = 0;
    storeMock.select.and.callFake(args=>{
        return counter++ && Observable.of(userInfo) || Observable.of(tab)
    });

    configMock = jasmine.createSpyObj('ClientConfigService', ['value']);
    configMock.value.and.returnValue( { isAdminApp: true });

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ AppComponent, RouterLinkStubDirective, RouterOutletStubComponent ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: ClientConfigService, useValue: configMock }
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    // act
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    // assert
    expect(app).toBeTruthy();
  }));

 it('should initialize the app', async(() => {
    // act
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    // assert
    expect(storeMock.select).toHaveBeenCalledTimes(2);
    expect(configMock.value).toHaveBeenCalled();

    app.selectedTab$.subscribe(tab=> {
        expect(tab).toBe(tab);
    });

    app.userInfo$.subscribe(uInfo=> {
        expect(uInfo).toEqual(userInfo);
    });

    app.isAdminApp$.subscribe(isAdminApp=> {
        expect(isAdminApp).toBe(true);
    });
  }));

  it('selectTab should dispatch UPDATE_TOP_TAB action', async(() => {
    // arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    // act
    app.selectTab(tab);

    // assert
    expect(storeMock.dispatch).toHaveBeenCalledWith({ type: UPDATE_TOP_TAB, payload: tab });
  }));
});
