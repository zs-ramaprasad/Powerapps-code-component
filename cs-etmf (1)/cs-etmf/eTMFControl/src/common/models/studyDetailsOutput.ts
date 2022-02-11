import { IBaseOutput } from "./baseOutput";

export interface ISiteDetailsOutput {
    SiteId: string;
    SiteNo?: string;
    FirstName?: string;
    LastName?: string;
    Address1?: string;
    CityState?: string;
    Country?: string[];
    GUID: string;
}

export interface IUserOutput {
    Name: string;
    Email: string;
    Id: string;
    GUID: string;
    IsActive: boolean;
}

export interface IProductOutput {
    Code: string;
    Description?: string;
    Id: string;
    GUID: string;
    INDNo: string;
    IsActive: boolean;
    Name: string;
}


export interface IIndicationOutput {
    Description?: string;
    Id: string;
    IsActive: boolean;
    Name: string;
    GUID: string;
   // Product: Product;
}

export class IStudyDetailsOutput extends IBaseOutput{
    cr53f_number: string;
    ct_protocalname: string;
    Product: IProductOutput;
    Indication: IIndicationOutput;
    SiteAdmins: IUserOutput[];
    Collaborators: IUserOutput[];
    FinCollaborators: IUserOutput[];
    Viewers: IUserOutput[];
    SiteDetails: ISiteDetailsOutput[];
    ct_cqs_studiesid: string;
    ct_id :string;
    ct_statusid : string;
}


export class IStudyDetailDummay{
    ct_id: string;
    ct_cqs_studiesid: string;
    ct_protocalname : string;
    Indication: IIndicationOutput;
}