import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WordpressService {

  constructor(private http:HttpClient) { }

    //
  getPage(url:string){
    return this.http.get(url,{});
  }
}
