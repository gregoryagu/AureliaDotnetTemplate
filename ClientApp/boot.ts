import "isomorphic-fetch";
import { Aurelia, PLATFORM } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "font-awesome/css/font-awesome.css";
declare const IS_DEV_BUILD: boolean; // The value is supplied by Webpack during the build using the Define Plugin.

//Export jQuery to window object
import * as $ from 'jquery';
let winObj: any = <any>window;
winObj['jQuery'] = $;
winObj['$'] = $;

export function configure(aurelia: Aurelia) {
	aurelia.use.standardConfiguration()
		.plugin(PLATFORM.moduleName('aurelia-syncfusion-bridge'), (syncfusion: any) => syncfusion.ejGrid());
		
	if (IS_DEV_BUILD) {
		aurelia.use.developmentLogging();
	}

	console.log('IsDevBuild=' + IS_DEV_BUILD);

	new HttpClient().configure(config => {
		const baseUrl = document.getElementsByTagName("base")[0].href;
		config.withBaseUrl(baseUrl);
	});

	aurelia.start().then(() => aurelia.setRoot("app/components/app/app"));
}
