export interface IApplication{
    id: string;
    name: string;
    appRoles: Array<{
        id: string;
        name: string;
    }>;
    isInsightsApp?: boolean;
    selected?: boolean;
}
