import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { InsightApplicationsComponent } from './insightApplications.component';
import { UploadInsightApplicationComponent } from './upload/insightApplication.upload.component';
import { CanDeactivateGuard } from 'ge-web-ui-lib/guards';
import { AuthGuard } from '../guards/authGuard';

const routes: Array<Route> = [
  { path: '', component: InsightApplicationsComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadInsightApplicationComponent, canActivate: [AuthGuard] , canDeactivate: [CanDeactivateGuard]},
]

export const routing : ModuleWithProviders = RouterModule.forChild(routes);
