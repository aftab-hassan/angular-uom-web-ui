import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { VerifyComponent } from 'ge-web-ui-lib/verify';
import { ErrorComponent } from 'ge-web-ui-lib/error';
import { AuthGuard } from './guards/authGuard';

declare var __clientSettings: any;

const routes: Array<Route> =
[   
    { path: '', pathMatch: 'full', redirectTo: 'orgs' }, 
    { path: 'id_token', redirectTo: 'orgs' },   
    { path: 'verify', component: VerifyComponent, canActivate: [AuthGuard] },
    { path: 'error/:id', component: ErrorComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'orgs', loadChildren: 'app/orgs/orgs.module#OrgsModule', canActivate: [AuthGuard] }
];

__clientSettings.isAdminApp && (
    routes.push({ path: 'insightApplications', loadChildren: 'app/insightApplications/insightApplications.module#InsightApplicationsModule', canActivate: [AuthGuard] })
)

export const routing : ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true }); 