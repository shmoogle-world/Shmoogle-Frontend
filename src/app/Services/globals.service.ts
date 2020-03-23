import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
    public apiKey: string = "e172c104-b919-42be-abad-dea7a2affdeb";
    // //devUrl
    public baseUrl: string = "http://bingsearchapiv1.azurewebsites.net/";
    //public baseUrl: string = "https://shmoogle.azurewebsites.net";
    constructor() { }
}
