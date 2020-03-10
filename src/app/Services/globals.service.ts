import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
    public apiKey: string = "c467fa56-5c12-4ff8-8e32-38ca6e903ea1";
    // //devUrl
    public baseUrl: string = "http://bingsearchapiv1.azurewebsites.net/";
    //public baseUrl: string = "https://shmoogle.azurewebsites.net";
    constructor() { }
}
