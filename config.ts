import * as fromAppInfo from './appInfo';

import * as common from 'ge-web-ui-lib/common'

export interface IClientSettings extends common.IClientSettings{
    isAdminApp: boolean;
    analyticsAppName: string;
    clientLoggerEndpoint: any;
    logSource: any;
}

export interface IConfigSettings extends common.IConfigSettings{
    isAdminApp: boolean;
    appVersion: string;
}

export class ConfigService {
    private static AppEnvSettingsKey = fromAppInfo.AppEnvSettingsKey;
    private static AppVersion = fromAppInfo.AppVersion;
    private static AppId = fromAppInfo.AppId;
    static IsAdminApp = fromAppInfo.IsAdminApp;

    static REGISTRAR = 'REGISTRAR';
    static UPDATE = 'UPDATE';
    static VIEW_ONLY = 'VIEWONLY';
    static VIEWER = 'VIEWER';
    static APPLICATION_ADMIN = 'APPLICATIONADMIN';

    static ROLES: string[] = [ ConfigService.REGISTRAR, ConfigService.UPDATE, ConfigService.VIEW_ONLY, ConfigService.VIEWER, ConfigService.APPLICATION_ADMIN ];

    value: IConfigSettings;

    constructor(){
        console.log(ConfigService.AppEnvSettingsKey + '=', process.env[ConfigService.AppEnvSettingsKey]);
        const appEnvSettings = JSON.parse(process.env[ConfigService.AppEnvSettingsKey]);

        // TDOO: Leaving splunkSettings to avoid build failure, please remove later
        this.value = {
            isAdminApp: ConfigService.IsAdminApp,
            appVersion: ConfigService.AppVersion,
            cdnUrl:  appEnvSettings.cdnUrl,
            splunkSettings: ( appEnvSettings.splunkSettings ) ? appEnvSettings.splunkSettings : null,
            clientSettings: this.getClientSettings(appEnvSettings)
        }
    }

    private getClientSettings(appEnvSettings){
        const aadSettings = appEnvSettings.clientSettings.aadSettings;

        let clientSettings: IClientSettings = {
            version : ConfigService.AppVersion,
            appId: ConfigService.AppId,
            isAdminApp: ConfigService.IsAdminApp,
            api:{
                endpoints: {
                    uom: {
                        url: appEnvSettings.uomServiceUrl,
                        allowCredentials: true,
                        allowAuthzHeaders: true
                    },
                    manager: {
                        url: appEnvSettings.managerServiceUrl,
                    }
                },
                timeout: appEnvSettings.clientSettings.uomApiTimeout || 0
            },
            aadSettings: {
                clientId: aadSettings.uomAppAadClientId,
                anonymousEndpoints: [],
                endpoints: aadSettings.endpoints || {},
                tenant: '',
                sessionTimeout: aadSettings.sessionTimeout || 3600000
            },
            loggingConfig: appEnvSettings.clientSettings.log4jsConfig,
            analyticsAppName: appEnvSettings.clientSettings.analyticsAppName || 'Applied Intelligence',
            clientLoggerEndpoint: appEnvSettings.clientLoggerEndpoint,
            logSource: appEnvSettings.logSource
        };

        clientSettings.appId = ConfigService.AppId;
        const aadTenant = aadSettings.aadTenantDomain;
        clientSettings.aadSettings.tenant = aadTenant;

        return clientSettings;
    }
}
