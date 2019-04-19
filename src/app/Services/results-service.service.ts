import { Injectable } from '@angular/core';
import { ResultModel } from '../Models/resultmodel';

@Injectable()
export class ResultsServiceService {

  public landing: boolean = true;
  public resultsArray: ResultModel[];
  public aboutUs: boolean = false;
  public text: string;
  constructor() { }

}
