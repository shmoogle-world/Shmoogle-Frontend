import { ImageResult } from './models/image-result.model';
import { WebResult } from './models/web-result.model';

export class SearchResults {

  constructor(
    private shuffledArr: WebResult[] | ImageResult[] = [],
    private unshuffledArr: WebResult[] | ImageResult[] = [],
    private resultCount: number = 0,
    private elapsedSearchTime: number = 0,
  ) { }


  public set shuffled(v: WebResult[] | ImageResult[]) {
    this.shuffledArr = v;
  }

  public set unshuffled(v: WebResult[] | ImageResult[]) {
    this.unshuffledArr = v;
  }


  public get unshuffled(): WebResult[] | ImageResult[] {
    return this.unshuffledArr.slice();
  }
  public get shuffled(): WebResult[] | ImageResult[] {
    return this.shuffledArr.slice();
  }


  public get elapsed(): number {
    return this.elapsedSearchTime;
  }

  public get count(): number {
    return this.resultCount;
  }


}