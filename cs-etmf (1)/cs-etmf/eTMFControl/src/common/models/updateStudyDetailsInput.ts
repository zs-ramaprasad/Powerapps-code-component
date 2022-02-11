
export interface IUpdateSiteDetailsInput {
    SiteId: string;
    SiteNo?: string;
    FirstName?: string;
    LastName?: string;
    Address1?: string;
    CityState?: string;
    Country?: string[];
    Id: string;
    GUID: string;
}


export interface IUpdateStudyDetailsInput{
    Number?: string;
    ProtocolName?: string;
    ProductId?: string;
    IndicationId?: string;
    SiteAdmins?: string[];
    Collaborators?: string[];
    FinCollaborators?: string[];
    Viewers?: string[];
    SiteDetails?: IUpdateSiteDetailsInput[];
    Id: string;
    GUID: string;
}
