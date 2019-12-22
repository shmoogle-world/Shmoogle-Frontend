import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
    public apiKey: string = "";
    public baseUrl: string = "https://shmoogle.azurewebsites.net";
    constructor() { }
}
