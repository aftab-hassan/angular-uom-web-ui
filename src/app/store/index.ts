import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromLibStore from 'ge-web-ui-lib/store';
import * as fromAuth from 'ge-web-ui-lib/store/auth/auth.reducer';
import * as fromAuthZ from 'ge-web-ui-lib/store/auth/authz.reducer';

import * as fromAllOrganization from './organization/allOrganizations.reducer';
import * as fromOrganization from './organization/organization.reducer';
import * as fromApplications from './applications/applications.reducer';
import * as fromInsightApplications from './insightApplications/allInsightApplications.reducer';
import * as fromSelectedInsightApplications from './insightApplications/selectedInsightApplications.reducer';
import * as fromApplicationPackage from './applicationPackage/applicationPackage.reducer';
import * as fromDeleteApplication from './deleteapplication/deleteapplication.reducer';
import * as fromUiState from './ui/ui.reducer';

import { OrganizationEffects } from './organization/organization.effects';
import { ApplicationsEffects } from './applications/applications.effects';
import { InsightApplicationsEffects } from './insightApplications/insightApplications.effects';
import { ApplicationPackageEffects } from './applicationPackage/applicationPackage.effects';
import { DeleteApplicationEffects } from './deleteapplication/deleteapplication.effects';

import { ConfigService } from '../../../config'

// app state
export interface IAppState{
    organizations: fromAllOrganization.State;
    selectedOrganization: fromOrganization.State;
    applications: fromApplications.State;
    insightApplications: fromInsightApplications.State;
    selectedInsightApplications: fromSelectedInsightApplications.State;
    applicationPackage: fromApplicationPackage.State;
    deleteApplication: fromDeleteApplication.State;
    auth: fromAuth.State;
    authz: fromAuthZ.State;
    uiState: fromUiState.State;
}

// reducers
const combined = combineReducers({
    organizations: fromAllOrganization.reducer,
    selectedOrganization: fromOrganization.reducer,
    applications: fromApplications.reducer,
    insightApplications: fromInsightApplications.reducer,
    selectedInsightApplications: fromSelectedInsightApplications.reducer,
    applicationPackage: fromApplicationPackage.reducer,
    deleteApplication: fromDeleteApplication.reducer,
    auth: fromLibStore.authReducer,
    authz: fromLibStore.authzReducer,
    uiState: fromUiState.reducer
});

// store
export const store = StoreModule.provideStore(combined);

// effects
export const effects = [
    EffectsModule.run(OrganizationEffects),
    EffectsModule.run(ApplicationsEffects),
    EffectsModule.run(InsightApplicationsEffects),
    EffectsModule.run(ApplicationPackageEffects),
    EffectsModule.run(fromLibStore.AuthEffects),
    EffectsModule.run(DeleteApplicationEffects),
    EffectsModule.run(fromLibStore.LoggingEffects)
];

// auth selectors
export { isAuthenticated, getAuthCode, getUserInfo } from 'ge-web-ui-lib/store';

// all organizations selectors
export const getAllOrganizations = (state: IAppState)=> fromAllOrganization.getOrganizations(state.organizations);
export const getAllOrganizationSortInfo = (state: IAppState)=> fromAllOrganization.getSortInfo(state.organizations);
export const isLoadingAllOrganizations = (state: IAppState)=> fromAllOrganization.isLoading(state.organizations);
export const getAllOrganizationsErrorMessage = (state: IAppState)=> fromAllOrganization.getErrorMessage(state.organizations);

// selected organization selectors
export const getSelectedOrganization = (state: IAppState)=> fromOrganization.getOrganization(state.selectedOrganization);
export const isLoadingSelectedOrganization = (state: IAppState)=> fromOrganization.isLoading(state.selectedOrganization);
export const isSubmittingSelectedOrganization = (state: IAppState)=> fromOrganization.isSubmitting(state.selectedOrganization);
export const isSubmitSelectedOrganizationSuccessful = (state: IAppState)=> fromOrganization.isSubmitSuccessful(state.selectedOrganization);
export const getSelectedOrganizationErrorMessage = (state: IAppState)=> fromOrganization.getErrorMessage(state.selectedOrganization);
export const getSelectedOrganizationSuccessMessage = (state: IAppState)=> fromOrganization.getSuccessMessage(state.selectedOrganization);

// applications selectors
export const getApplications = (state: IAppState)=> fromApplications.getApplications(state.applications);
export const isLoadingApplications = (state: IAppState)=> fromApplications.isLoading(state.applications);
export const getApplicationsErrorMessage = (state: IAppState)=> fromApplications.getErrorMessage(state.applications);

// insight applications selectors
export const getInsightApplications = (state: IAppState)=> fromInsightApplications.getInsightApplications(state.insightApplications);
export const getInsightApplicationsSortInfo = (state: IAppState)=> fromInsightApplications.getSortInfo(state.insightApplications);
export const isLoadingInsightApplications = (state: IAppState)=> fromInsightApplications.isLoading(state.insightApplications);
export const getInsightApplicationsErrorMessage = (state: IAppState)=> fromInsightApplications.getErrorMessage(state.insightApplications);

// selected insight applications selectors
export const getSelectedInsightApplications = (state: IAppState)=> fromSelectedInsightApplications.getInsightApplications(state.selectedInsightApplications);
export const isLoadingSelectedInsightApplications = (state: IAppState)=> fromSelectedInsightApplications.isLoading(state.selectedInsightApplications);
export const isSubmittingSelectedInsightApplications = (state: IAppState)=> fromSelectedInsightApplications.isSubmitting(state.selectedInsightApplications);
export const isSubmitSelectedInsightApplicationsSuccessful = (state: IAppState)=> fromSelectedInsightApplications.isSubmitSuccessful(state.selectedInsightApplications);
export const getSelectedInsightApplicationsErrorMessage = (state: IAppState)=> fromSelectedInsightApplications.getErrorMessage(state.selectedInsightApplications);
export const getSelectedInsightApplicationsSuccessMessage = (state: IAppState)=> fromSelectedInsightApplications.getSuccessMessage(state.selectedInsightApplications);

// application package selectors
export const isSubmittingApplicationPackage = (state: IAppState)=> fromApplicationPackage.isSubmitting(state.applicationPackage);
export const isSubmitApplicationPackageSuccessful = (state: IAppState)=> fromApplicationPackage.isSubmitSuccessful(state.applicationPackage);
export const getApplicationPackageErrorMessage = (state: IAppState)=> fromApplicationPackage.getErrorMessage(state.applicationPackage);
export const getApplicationPackageSuccessMessage = (state: IAppState)=> fromApplicationPackage.getSuccessMessage(state.applicationPackage);

// delete application selectors
export const isSubmittingDeleteApplication = (state: IAppState)=> fromDeleteApplication.isSubmitting(state.deleteApplication);
export const isSubmitDeleteApplicationSuccessful = (state: IAppState)=> fromDeleteApplication.isSubmitSuccessful(state.deleteApplication);
export const isLoadingDeleteApplication = (state: IAppState)=> fromDeleteApplication.isLoading(state.deleteApplication);
export const getDeleteApplicationErrorMessage = (state: IAppState)=> fromDeleteApplication.getErrorMessage(state.deleteApplication);
export const getDeleteApplicationSuccessMessage = (state: IAppState)=> fromDeleteApplication.getSuccessMessage(state.deleteApplication);

// ui state selectors
export const getSelectedTopTab = (state: IAppState)=> fromUiState.getSelectedTopTab(state.uiState);

// auth selectors
export const canUserEdit = (state: IAppState)=> fromAuth.getUserInfo(state.auth)
                                                            .roles.some(r=> r.toUpperCase() === ConfigService.REGISTRAR || r.toUpperCase() === ConfigService.UPDATE);
