import { ISiteDetailsInput } from "./siteDetailsInput";

export interface ICreateStudyinput {
    Number: string;
    ProtocolName: string;
    ProductId: string;
    IndicationId: string;
    SiteAdmins: string[];
    Collaborators: string[];
    FinCollaborators: string[];
    Viewers: string[];
    SiteDetails: ISiteDetailsInput[];
}
