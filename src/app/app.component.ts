import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getUserInfo  } from 'ge-web-ui-lib/store';
import { ClientConfigService, IAuthInfo } from 'ge-web-ui-lib/services';

import { IClientSettings } from '../../config';
import * as fromRoot from './store';
import { UPDATE_TOP_TAB } from './store/ui/ui.actions';
import { ConfigService } from '../../config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent{
    userInfo$: Observable<IAuthInfo>;
    isAdminApp$: Observable<boolean>;
    selectedTab$: Observable<string>;
    private userRoles: string[];
    private applicationAdmin: string;

    constructor(private store: Store<fromRoot.IAppState>, clientConfigService: ClientConfigService){
        this.selectedTab$ = store.select(fromRoot.getSelectedTopTab);
        this.userInfo$ = store.select(getUserInfo);
        this.isAdminApp$ = Observable.of((<IClientSettings>clientConfigService.value()).isAdminApp);
        this.userRoles = ConfigService.ROLES;
        this.applicationAdmin = ConfigService.APPLICATION_ADMIN;
    }

    selectTab(tab){
        this.store.dispatch({ type: UPDATE_TOP_TAB, payload: tab });
    }

    canAccess( expectedRole: string ): boolean {
      let index = this.userRoles.findIndex( function( role ) {
        return role.toLowerCase() == expectedRole.toLowerCase();
      } );

      return index > -1;
    }
}
