import { Injectable } from '@angular/core'; 
import { environment } from '../../../../environments/environment'; 
//import { AppInsights } from '../../../../../node_modules/angular-applicationinsights/dist/angular-applicationinsights.min.js'; 


@Injectable() 
export class InsightsServiceComponent {
  
    // private config: AppInsights.IConfig = { 
    //   instrumentationKey: environment.appInsights.instrumentationKey 
    // }; 
  
    constructor() { 
      // if (!AppInsights.config) { 
      //   AppInsights.downloadAndSetup(this.config); 
      // } 
    } 
  
    // logPageView(name?: string, url?: string, properties?: any, 
    //     measurements?: any, duration?: number) { 
    // AppInsights.trackPageView(name, url, properties, measurements, duration); 
    // } 
  
    // logEvent(name: string, properties?: any, measurements?: any) { 
    //   AppInsights.trackEvent(name, properties, measurements); 
    // } 
  
}

