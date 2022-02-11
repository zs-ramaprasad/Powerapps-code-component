import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { studyManagementService } from "./src/service/studyManagementService";
import axios from "axios";
import { IStudyDetailDummay, IStudyDetailsOutput } from "./src/common/models/studyDetailsOutput";


export class eTMFControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	// Reference to the control container HTMLDivElement
	// This element contains all elements of our custom control example
	private _container: HTMLDivElement;

	// Reference to ComponentFramework Context object
	private _context: ComponentFramework.Context<IInputs>;
	private _createEntity1Button: HTMLButtonElement;
	private _createEntity1Text: HTMLTextAreaElement;
	private hasRendered :boolean = false;
	//public aadTokenProviderFactory: AadTokenProviderFactory = new AadTokenProviderFactory();

	private _controlViewRendered: boolean;

	/**
	 * Empty constructor.
	 */
	constructor() {

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
		// Add control initialization code
		this._context = context;
		this._controlViewRendered = false;
		this._container = document.createElement("div");
		this._container.classList.add("WebAPIControl_Container");
		container.appendChild(this._container);
	}

	private renderCreateExample() {

		// Create header label for Web API sample
		const headerDiv: HTMLDivElement = this.createHTMLDivElement("create_container", true, `Click to create record`);
		this._container.appendChild(headerDiv);

		// Create button 1 to create record with revenue field set to 100
		const value1 = "100";
		this._createEntity1Button = this.createHTMLButtonElement(
			"Test",
			"123",
			value1,
			this.createButtonOnClickHandler.bind(this));

		// Append all button HTML elements to custom control container div
		this._container.appendChild(this._createEntity1Button);

	}

	private async createButtonOnClickHandler(event: Event) {
		alert("Hi this is for demo2");
		//this.getAccessToken();
		// await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata')
		// .then(response =>
		// alert(JSON.parse(response.json())));


		// const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
		// const time = await response.json();
		// console.log(time);

		const _entityName = "ct_cqs_studies";

		// Required field on _entityName of type 'single line of text'
		// Example Web API calls performed by example custom control will set this field for new record creation examples
		const _requiredAttributeName = "cr53f_number";

		// Value the _requiredAttributeName field will be set to for new created records
		const _requiredAttributeValue = "STD-01";

		// Name of currency field on _entityName to populate during record create
		// Example Web API calls performed by example custom control will set and read this field
		const _currencyAttributeName = "ct_protocalname";

		// Friendly name of currency field (only used for control UI - no functional impact)
		//const _currencyAttributeNameFriendlyName = "annual revenue";

		// Generate OData query string to retrieve the _currencyAttributeName field for all _entityName records
		// Add a filter to only retrieve records with _requiredAttributeName field which contains _requiredAttributeValue
		//const queryString = `?$select= ${_currencyAttributeName}&$filter=contains(${_requiredAttributeName},'${_requiredAttributeValue}')`;
		const queryString = "?$select= ct_id,ct_protocalname,cr53f_number";
		// Invoke the Web API Retrieve Multiple call
		this._context.webAPI. retrieveMultipleRecords(_entityName, queryString).then(
			(response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
				// Loop through each returned record
				for (const entity of response.entities) 
				{
					const parsedData =	JSON.parse(JSON.stringify(entity).replace("/",""));
					const obj :IStudyDetailsOutput = <IStudyDetailsOutput>parsedData;
					console.log(obj);
				}
			},
			(errorResponse) => {
				// Error handling code here
				console.log(errorResponse);
			}
		);


		// const token1 = localStorage.getItem("secret");
		// const token2 = sessionStorage.getItem("secret");
		

		// console.log(token1);
		// console.log(token2);

		const bearerToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2NlbGl0b3ZhbGlkYXRpb24uY3JtLmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2Y1ODg3YWUyLTk1OWItNGY5Ni1iZmQyLTEwZTZkY2Q1ZjhiZi8iLCJpYXQiOjE2NDQ0MDY0MjYsIm5iZiI6MTY0NDQwNjQyNiwiZXhwIjoxNjQ0NDExNDQ4LCJhY3IiOiIxIiwiYWlvIjoiQVNRQTIvOFRBQUFBQ05qVDhjMnl0NmtneFFqc0t1Zjg0TEVlbG1FSUFQQVlNYTNOekN6bCtiMD0iLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiNTFmODE0ODktMTJlZS00YTllLWFhYWUtYTI1OTFmNDU5ODdkIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJWYW5rYWRhcmkiLCJnaXZlbl9uYW1lIjoiVmlzd2FuYXRoIiwiaXBhZGRyIjoiMTA2LjUxLjI2LjEzMCIsIm5hbWUiOiJWaXN3YW5hdGggVmFua2FkYXJpIiwib2lkIjoiNmM0NDMxNWYtNTQzNC00NzZmLWJkYzItYzk2MWQ3OWYyMDRkIiwicHVpZCI6IjEwMDMyMDAxMkY2NEE3NjEiLCJyaCI6IjAuQVVZQTRucUk5WnVWbGstXzBoRG0zTlg0dndjQUFBQUFBQUFBd0FBQUFBQUFBQUJHQU5VLiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6ImVGLWZTTHUzakxjZW1LYWxqUU1CNEl6U3VFUzlfR09hZFNGVm9PWGFqd1EiLCJ0aWQiOiJmNTg4N2FlMi05NTliLTRmOTYtYmZkMi0xMGU2ZGNkNWY4YmYiLCJ1bmlxdWVfbmFtZSI6InZ2YW5rYWRhcmlAY2VsaXRvdGVjaC5jb20iLCJ1cG4iOiJ2dmFua2FkYXJpQGNlbGl0b3RlY2guY29tIiwidXRpIjoiSjJIX0ZpUTdBMHlubUFrODVuNDlBUSIsInZlciI6IjEuMCJ9.XZwH2HNLiDiMMjYs1AutyGGA2IrKK7Qbf0zuFOIdLEb3U1OKjOAv_4xk79-r3YPnU_WhLyMxg_zVFmiGZ15FwtX2NcllTYHxWIreE9t4WVK_NO8YIXinS7lb_a8sEbiyQcIPcPr34kh8oQpehBJ5Xa7CqAo3lpGs7NR06Np-Eni6U3PUCG5Wmzzk1wSuscc7f-1uOWWC6TkkT3KfT9My68tc6adPVLsRrJCLTzRcdMRJofTJ5N8srpTBsRy3Ml5yL_P_Tfx-HI4jIc7gldZjmzZwWoPUhbggfRBxtjVSYUX7Ki2a2VY6drRe3WcTTb9ZOCAn92LZk7xVDhL0rRXNAQ';
		const url = "https://celitovalidation.crm.dynamics.com/api/data/v9.2/ct_cqs_studieses?$select=ct_id&$filter=cr53f_number%20eq%20'STD-01'";
		const getResponse = await axios({
			url,
			method: "GET",
			headers: { "Authorization": bearerToken }
		});

		// console.log(getResponse.data.value);
		// let re=  getResponse.data.value[0];
		// console.log(getResponse.data.value[0]["ct_id"]);
		// console.log(getResponse.data.value[0].ct_id);


		// getResponse.data.value.map((item: any) => {
		// 	console.log(item)
		// 	})

		// const parsedData =	JSON.parse(JSON.stringify(getResponse.data.value[0]).replace("/",""));
		// const obj :IStudyDetailDummay = <IStudyDetailDummay>parsedData;
		

		// console.log(obj);
		// obj.ct_id =getResponse.data.value[0].ct_id;
		// obj.ct_id =getResponse.data.value[0].ct_id;

		// ;
		//  console.log(obj.ct_id);


		// // 	const postResponse = await axios({
		// // 		url,
		// // 		method: "POST",
		// // 		headers: {"Authorization":`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2NlbGl0b2NzZGV2LmNybS5keW5hbWljcy5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mNTg4N2FlMi05NTliLTRmOTYtYmZkMi0xMGU2ZGNkNWY4YmYvIiwiaWF0IjoxNjQxMjk3NDI4LCJuYmYiOjE2NDEyOTc0MjgsImV4cCI6MTY0MTMwMjYzNSwiYWNyIjoiMSIsImFpbyI6IkFTUUEyLzhUQUFBQXBEMlltTWI4SVl4eTN4ZG1DY3FReldTY1gyTUhpTkg4MXVsUUVLMUhSWUE9IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjUxZjgxNDg5LTEyZWUtNGE5ZS1hYWFlLWEyNTkxZjQ1OTg3ZCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiVmFua2FkYXJpIiwiZ2l2ZW5fbmFtZSI6IlZpc3dhbmF0aCIsImlwYWRkciI6IjEwNi41MS4yNS4xNDQiLCJuYW1lIjoiVmlzd2FuYXRoIFZhbmthZGFyaSIsIm9pZCI6IjZjNDQzMTVmLTU0MzQtNDc2Zi1iZGMyLWM5NjFkNzlmMjA0ZCIsInB1aWQiOiIxMDAzMjAwMTJGNjRBNzYxIiwicmgiOiIwLkFVWUE0bnFJOVp1VmxrLV8waERtM05YNHY0a1UtRkh1RXA1S3FxNmlXUjlGbUgxR0FOVS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJlRi1mU0x1M2pMY2VtS2FsalFNQjRJelN1RVM5X0dPYWRTRlZvT1hhandRIiwidGlkIjoiZjU4ODdhZTItOTU5Yi00Zjk2LWJmZDItMTBlNmRjZDVmOGJmIiwidW5pcXVlX25hbWUiOiJ2dmFua2FkYXJpQGNlbGl0b3RlY2guY29tIiwidXBuIjoidnZhbmthZGFyaUBjZWxpdG90ZWNoLmNvbSIsInV0aSI6IjFGbXN2SzNWdVUtdHBSVFdjZFdBQXciLCJ2ZXIiOiIxLjAifQ.e_CmwoQtvgElBoRcKFeIQ-JZbDbiga7HprWjJmwOCydR-2wkGkY96uT2BgIylwzR2fFGzjJWei5nIxfkSJAGfhCO7qKwjqfdjx6G_X5MJFx7yP1BbX7OmwKVzBARhu2XuN9ZNRJmuKfIrC_9gFBahCup9Zi8q1392WdijJbhrEIee5NLb4O2CILhZpawicLToKVL6bzuvS-LnYilnbtnq8BKudSDWckAqvXhWbtXZnhKT2e-Pc1mbE0t8tMSX0gcLxXX2y0DIzGsoYw8YybyS_0g7lxHyirYpNmNVCb1M8c-5AIrZQLHau0J4TK0n0_MB7BiFRgcQy3FzMzqQOjgEg`},
		// //   });

		// // 	  console.log(postResponse.data.value)

		// //const url2 = 'https://celitocsdev.crm.dynamics.com/api/data/v9.0/poc_customers(72b232f8-a56c-ec11-8943-000d3a309bcc)';
		// const url2 = 'https://celitocsdev.crm.dynamics.com/api/data/v9.0/poc_customers';

		// const requestOptions = {
		// 	method: 'POST',//PATCH
		// 	headers: { "Authorization": bearerToken, "Content-Type": 'application/json' },
		// 	body: JSON.stringify({ "poc_name": "new record from PCF2", "poc_state": "demo state" })
		// };
		// const postResponse1 = fetch(url2, requestOptions);
		// const time1 = await (await postResponse1).json;
		// console.log(time1);

		// //body: JSON.stringify({ "poc_name": "Updated record PCF3" })



		// const accesstoken = "";
		// const headerprefix = "";
		// const tokenname = "";
		// const granttype = "";
		// const callbackurl = "";
		// const authurl = "";
		// const clientid = "";
		// const clientauthentication = "";

		// // const body: string = JSON.stringify(

		// // 	{

		// // 	  EnvelopeID: item.EnvelopeID,

		// // 	  ItemID: parseInt(item.Id),

		// // 	  IsCertificate: IsCertificate

		// // 	}

		// //   );

		// const requestHeaders: Headers = new Headers();
		// requestHeaders.append("Content-type", "application/json");
		// requestHeaders.append("Authorization", "application/json");
		// requestHeaders.append("Content-Length", "application/json");
		// requestHeaders.append("Host", "");
		// requestHeaders.append("User-Agent", "");
		// requestHeaders.append("Accept", "*/*");
		// requestHeaders.append("Accept-Encoding", "gzip, deflate, br");
		// requestHeaders.append("Connection", "keep-alive");





	}

	private accessToken: string;

	// update ResourceURI based on your dynamic crm uri
	public resourceUri: "https://celitocsdev.crm.dynamics.com";

	// public async getAccessToken(){
	// 	const token = sessionStorage.getItem("dynamic365Token");
	// 	if(token)
	// 	  this.accessToken = token;
	// 	else{
	// 	  await 
	// 	  this.aadTokenProviderFactory
	// 	  .getTokenProvider()
	// 	  .then((tokenProvider:any) => {
	// 		tokenProvider
	// 		  .getToken(this.resourceUri)
	// 		  .then((t:any) => {
	// 			this.accessToken = t;
	// 			sessionStorage.setItem("dynamic365Token",t);
	// 		  })
	// 		  .catch((err:any) => console.log("1Error: " + err));
	// 	  });
	// 	}
	// 	console.log("Hi..");
	// 	console.log(this.accessToken);
	// 	console.log(token);
	// 	console.log("Hi 2..");


	//   }

	private createHTMLButtonElement(buttonLabel: string, buttonId: string, buttonValue: string | null, onClickHandler: (event?: any) => void): HTMLButtonElement {
		const button: HTMLButtonElement = document.createElement("button");
		button.innerHTML = buttonLabel;

		// if (buttonValue) {
		// 	button.setAttribute("buttonvalue", buttonValue);
		// }

		button.id = buttonId;

		//button.classList.add("SampleControl_WebAPIControl_ButtonClass");
		button.addEventListener("click", onClickHandler);
		return button;
	}

	/**
	 * Helper method to create HTML Div Element
	 * @param elementClassName : Class name of div element
	 * @param isHeader : True if 'header' div - adds extra class and post-fix to ID for header elements
	 * @param innerText : innerText of Div Element
	 */
	private createHTMLDivElement(elementClassName: string, isHeader: boolean, innerText?: string): HTMLDivElement {
		const div: HTMLDivElement = document.createElement("div");

		if (isHeader) {
			div.classList.add("SampleControl_WebAPIControl_Header");
			elementClassName += "_header";
		}

		if (innerText) {
			div.innerText = innerText.toUpperCase();
		}

		div.classList.add(elementClassName);
		return div;
	}



	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		if(!this.hasRendered)
		{
			this.renderCreateExample();
			this.hasRendered = true;
		}
		// Add code to update control view
	}

	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
	}
}
