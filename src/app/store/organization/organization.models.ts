export interface IAdmin{
    name: string;
    email: string;
}

export interface ITag{
    name: string;
    value: string;
}

export interface IOrganization{
    id: string;
    organizationName: string;
    customerType: string;
    location: string;
    enabled: boolean;
    statusText?: string;
    registrationPending: boolean;
    contact: string;
    admins: Array<IAdmin>;
    tags?: Array<ITag>;
    apps: Array<string>;
}