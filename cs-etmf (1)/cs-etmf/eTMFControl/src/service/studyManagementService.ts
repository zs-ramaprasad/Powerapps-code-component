import axios from "axios";

import { IBaseOutput, IStudyDetailsOutput  } from '../common/models/modelIndex';
import { ICreateStudyinput } from '../common/models/modelIndex';
import { IUpdateStudyDetailsInput } from '../common/models/updateStudyDetailsInput';


export class studyManagementService {
    private accessToken = "string";
    //public aadTokenProviderFactory: AadTokenProviderFactory = new AadTokenProviderFactory;
 // update ResourceURI based on your dynamic crm uri
 public resourceUri = "dsf";
    constructor(){}
  /**
   *  Gets the details of the study for the given study number.
   * @param studyNumber StudyNumber for which the studydetails needs to be reterived.
   * @returns Complete details like User mapping, Site Details etc of the study will be present in the return object.
   * In case of error, BaseCode and BaseMessage will have error code and error details respectively.
   */
  public GetStudyDetails(studyNumber: String): Promise<IStudyDetailsOutput> {

    return new Promise((resolve, reject) => {
      try {
        //this.getAccessToken()
        if (true) {
          resolve({
            cr53f_number: 'test',
            ct_protocalname: 'desc',
            SiteAdmins: [{ Name: 'abc1', Email: '', Id: '', IsActive: true, GUID :"" },
            { Name: 'abc2', Email: '', Id: '', IsActive: true, GUID :""  }],
            Collaborators: [{ Name: 'abc1', Email: '', Id: '', IsActive: true , GUID :"" },
            { Name: 'abc2', Email: '', Id: '', IsActive: true , GUID :"" }],
            FinCollaborators: [{ Name: 'abc1', Email: '', Id: '', IsActive: true , GUID :"" },
            { Name: 'abc2', Email: '', Id: '', IsActive: true, GUID :""  }],
            Viewers: [{ Name: 'abc1', Email: '', Id: '', IsActive: true, GUID :""  },
            { Name: 'abc2', Email: '', Id: '', IsActive: true, GUID :"" }],
            SiteDetails: [{ SiteId: '', GUID :"" }],
            Indication: { Description: '', Id: '', IsActive: true, Name: '',GUID :'' },
            Product: { Code: '', Description: '', Id: '', INDNo: '', IsActive: true, Name: '', GUID :"" },
            BaseCode : 1000, BaseMessage : "Reterived study details.",
            ct_id :"",
            ct_cqs_studiesid : "",
            ct_statusid :""
          });
        }
        reject({BaseCode :-1000, BaseMessage : "error1"});
      }
      catch (error) {
        reject({BaseCode :-1001, BaseMessage : "error2"});

      }
    });

  }

/**
 * Creates a study with the given details.
 * @param studyDetails Details of the study like Number, Protocal, User mappings, Site Details etc, with which study needs to be created.
 * @returns Status of Study creation. In case of error, BaseCode and BaseMessage will have error code and error details respectively.
 */
 public CreateStudy(studyDetails: ICreateStudyinput): Promise<IBaseOutput> {

    return new Promise((resolve, reject) => {
      try {
          //Check business rules
          //1. All mandatory fields are present
          //2. StudyNumber should be unique.
        if (true) {
          resolve({BaseCode :0, BaseMessage : "succes"});
        }
        reject({BaseCode :-1000, BaseMessage : "error1"});
      }
      catch (error) {
       
        reject({BaseCode :-1001, BaseMessage : "error1"});

      }
    });

  }

  /**
 * Updates a study with the given details.
 * @param studyDetails Details of the study like Number, Protocal, User mappings, Site Details etc, with which study needs to be updated.
 * @returns Status of Study update. In case of error, BaseCode and BaseMessage will have error code and error details respectively.
 */
  public UpdateStudy(studyDetails: IUpdateStudyDetailsInput): Promise<IBaseOutput> {

    return new Promise((resolve, reject) => {
      try {
          //Check business rules
          //1. All mandatory fields are present
          //2. StudyNumber should be unique.
        if (true) {
          resolve({BaseCode :0, BaseMessage : "succes"});
        }
        reject({BaseCode :-1000, BaseMessage : "error1"});
      }
      catch (error) {
       
        reject({BaseCode :-1001, BaseMessage : "error1"});

      }
    });

  }

  // public async getAccessToken(){
  //   const token = sessionStorage.getItem("dynamic365Token");
  //   if(token)
  //     this.accessToken = token;
  //   else{
  //     await 
  //     this.aadTokenProviderFactory
  //     .getTokenProvider()
  //     .then((tokenProvider : any) => {
  //       tokenProvider
  //         .getToken(this.resourceUri)
  //         .then((t : any) => {
  //           this.accessToken = t;
  //           sessionStorage.setItem("dynamic365Token",t);
  //         })
  //         .catch((err : any) => console.log("Error: " + err));
  //     });
  //   }
  // }

}

