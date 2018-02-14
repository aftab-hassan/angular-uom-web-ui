import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { CanDeactivateGuard } from 'ge-web-ui-lib/guards';
import { AuthGuard } from '../guards/authGuard';

import { OrgsComponent } from './orgs.component';
import { AddOrgComponent } from './add/org.add.component';
import { EditOrgComponent } from './edit/org.edit.component';

declare var __clientSettings: any;

const routes: Array<Route> = __clientSettings.isAdminApp && 
[
    { path: '', component: OrgsComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddOrgComponent, canActivate: [AuthGuard] , canDeactivate: [CanDeactivateGuard]},
    { path: ':id/edit', component: EditOrgComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] }
] ||
[
    { path: '', component: EditOrgComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] }
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes); 