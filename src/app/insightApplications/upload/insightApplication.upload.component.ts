import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../store';
import { UPDATE_APPLICATION_PACKAGE } from '../../store/applicationPackage/applicationPackage.actions';
import { UPDATE_APPLICATION_PACKAGE_SET_DEFAULT_STATE } from '../../store/applicationPackage/applicationPackage.actions';
import { UPDATE_TOP_TAB } from '../../store/ui/ui.actions';
import { CanComponentDeactivate } from 'ge-web-ui-lib/guards';

@Component({
    selector: 'insight-apps-upload',
    templateUrl: './insightApplication.upload.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadInsightApplicationComponent implements OnInit, CanComponentDeactivate{
    isSubmitting$: Observable<boolean>;
    isSubmitSuccessful$: Observable<boolean>;
    errorMessage$: Observable<string>;
    successMessage$: Observable<string>;

    private package: File;
    private applicationName: string;
    private versionNumber: string;
    private staticFileSelected: boolean;
    private applicationNamePresent: boolean;
    private versionNumberPresent: boolean;
    private applicationEngine: string;

    constructor(
        private store: Store<fromRoot.IAppState>,
        private router: Router){
            store.dispatch({ type: UPDATE_TOP_TAB, payload: 'apps' });
        }

    ngOnInit(){
        this.errorMessage$ = this.store.select(fromRoot.getApplicationPackageErrorMessage);
        this.successMessage$ = this.store.select(fromRoot.getApplicationPackageSuccessMessage);
        this.isSubmitting$ = this.store.select(fromRoot.isSubmittingApplicationPackage);
        this.staticFileSelected = false;
        this.applicationEngine = 'sisense';
        this.applicationNamePresent = false;
        this.versionNumberPresent = false;
        this.store.dispatch({ type: UPDATE_APPLICATION_PACKAGE_SET_DEFAULT_STATE });
    }

    canDeactivate(): Observable<boolean> {
        return Observable.of(true);
    }

    setPackage(e){
        this.package = e.target.files[0];
        this.staticFileSelected = true;
    }

    setApplicationName($event): void {
        let target = $event.target || $event.srcElement;
        if( target && target.value ) {
          this.applicationName = target.value;
          this.applicationNamePresent = true;
        }
    }

    setVersionNumber($event): void {
      let target = $event.target || $event.srcElement;
      if( target && target.value ) {
        this.versionNumber = target.value;
        this.versionNumberPresent = true;
      }
    }

    handleClickSisense(): void {
      this.applicationEngine = 'sisense';
    }

    handleClickPowerBi(): void {
      this.applicationEngine = 'powerbi';
    }

    submitForm(){
            if(!this.package) return;

            this.store.dispatch({ type: UPDATE_APPLICATION_PACKAGE, payload: { package: this.package, applicationName : this.applicationName, applicationEngine : this.applicationEngine, versionNumber : this.versionNumber } });
            this.isSubmitSuccessful$ =
                this.store.select(fromRoot.isSubmitApplicationPackageSuccessful)
                .map(isCompleted=> {
                    isCompleted && (this.router.navigate(['/insightApplications']));
                    return isCompleted;
                });
        }
}
