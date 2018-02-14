import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromLibGuards from 'ge-web-ui-lib/guards';
import { IAuthInfo } from 'ge-web-ui-lib/services';

import * as fromRoot from '../store';
import { ConfigService } from '../../../config'

@Injectable()
export class AuthGuard extends fromLibGuards.AuthGuard {

    userInfo$: Observable<IAuthInfo>;

    constructor(protected store: Store<fromRoot.IAppState>, protected router: Router){
        super(store, router)
        this.initializeData()
    }

    private initializeData(){
        this.userInfo$ = this.store.select(fromRoot.getUserInfo)
        this.hasUserAccess$ = this.hasUserAccess()
    }

    private hasUserAccess(): Observable<boolean>{
        return this.userInfo$.switchMap(uInfo=> {
            const roles = uInfo.roles.map(r=> r.toUpperCase());

            const isUpdater = roles.some(r=> ConfigService.IsAdminApp && r === ConfigService.REGISTRAR) || roles.some(r=> r === ConfigService.UPDATE);
            if(isUpdater) return Observable.of(true);

            const isApplicationAdmin = roles.some(r=> ConfigService.IsAdminApp && r === ConfigService.APPLICATION_ADMIN);
            if(isApplicationAdmin) return Observable.of(true);

            const isViewer = roles.some(r=> ConfigService.IsAdminApp && r === ConfigService.VIEWER) || roles.some(r=> r === ConfigService.VIEW_ONLY);
            return Observable.of(isViewer);
        })
    }
}
