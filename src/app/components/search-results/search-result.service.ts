import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shuffle } from 'lodash';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GlobalsService } from '../../Services/globals.service';
import { ImageResult } from './models/image-result.model';
import { WebResult } from './models/web-result.model';
import { SearchResults } from './search-results.model';

@Injectable()
export class SearchResultService {

  public resultsChanged = new ReplaySubject<SearchResults>();
  public requestPendingChanged = new ReplaySubject<boolean>();
  public showShuffled = new BehaviorSubject<boolean>(true);

  public searchQuery: string;
  readonly isMobile: boolean = window.innerWidth <= 540;
  public endpointPath: string = "search/";
  private type: string = "text";

  constructor(public http: HttpClient,
    private globals: GlobalsService,
    public navservice: Router,
  ) { }


  //#region Caching

  private set newResults(newResults: SearchResults) {
    this.resultsChanged.next(newResults);
  }

  private set searchRequestPending(v: boolean) {
    this.requestPendingChanged.next(v);
  }

  public cacheIsValid(): boolean {
    return sessionStorage.getItem('cache_shuffled') &&
      sessionStorage.getItem('cached_query') &&
      this.searchQuery == sessionStorage.getItem('cached_query') && sessionStorage.getItem('type') == this.type;
  }

  public getCache(): SearchResults {
    this.type = sessionStorage.getItem("type");
    const shuffled = <WebResult[]>JSON.parse(sessionStorage.getItem("cache_shuffled"));
    return new SearchResults(
      shuffled,
      <WebResult[]>JSON.parse(sessionStorage.getItem("cache_unshuffled")),
      shuffled.length,
      parseFloat(sessionStorage.getItem("elapsed")),
    );

  }

  public setCache(searchResults: SearchResults) {
    sessionStorage.setItem("type", this.type);
    sessionStorage.setItem("cached_query", this.searchQuery);
    sessionStorage.setItem("cache_shuffled", JSON.stringify(searchResults.shuffled));
    sessionStorage.setItem("cache_unshuffled", JSON.stringify(searchResults.unshuffled));
    sessionStorage.setItem("elapsed", searchResults.elapsed.toString());
  }

  //#endregion 

  public requestSearch(text) {
    this.searchQuery = text;
    if (this.cacheIsValid()) {
      let cachedRes = this.getCache();
      cachedRes.shuffled = shuffle(cachedRes.shuffled);
      this.setCache(cachedRes);
      this.newResults = cachedRes;
      return;
    }
    this.sendSearchRequest();
  }

  public sendSearchRequest() {
    window.scrollTo(0, 0);
    if (this.searchQuery === "") {
      this.navservice.navigateByUrl("/");
    } else if (this.cacheIsValid()) {
      this.newResults = this.getCache();
      return;
    }
    this.setParam("q", this.searchQuery);

    this.fetchSearchResults();
  }

  private fetchSearchResults(): void {

    this.searchRequestPending = true;

    const initialSearchTime = new Date().getTime();
    this.http.get<[WebResult[] | ImageResult[], WebResult[] | ImageResult[]]>(
      `${environment.apiEndpoint}api/${this.endpointPath}${this.searchQuery}?key=${environment.apiKey}`
    ).pipe(map(response => {
      for (let i = 0; i < response[0].length; ++i) {
        if (response[0][i].hasOwnProperty("url")) {
          const tmp1 = response[0][i];
          const tmp2 = response[1][i];
          try {
            // @ts-ignore
            response[0][i].url = decodeURI(tmp1.url);
            // @ts-ignore
            response[1][i].url = decodeURI(tmp2.url);
          } catch (e) {
            // @ts-ignore
            response[0][i].url = tmp1.url;
            // @ts-ignore
            response[1][i].url = tmp2.url;
          }
        }
      }
      return response;
    }))
      .subscribe(
        this.handleSearchResponse.bind(this, initialSearchTime),
        error => {
          console.log(error.error);
          this.newResults = new SearchResults();
          this.searchRequestPending = false;
        }
      );
  }

  private handleSearchResponse(initialSearchTime: number, response: [(WebResult[] | ImageResult[]), (WebResult[] | ImageResult[])]) {
    if (response[0].length == undefined || response[0].length == 0) {
      const searchResults = new SearchResults(
        [],
        [],
        0,
        0,
      );
      this.setCache(searchResults);
      this.newResults = searchResults;
      this.searchRequestPending = false;
      return;
    };

    if (!response[0][0].hasOwnProperty("url") && this.type == "text") {
      return;
    }


    const searchResults = new SearchResults(
      response[1],
      response[0],
      response[0].length,
      (new Date().getTime() - initialSearchTime) / 1000
    );
    this.setCache(searchResults);
    this.newResults = searchResults;
    this.searchRequestPending = false;
  }

  public setParam(key, value) {
    const params = new URLSearchParams(location.search);
    params.set(key, value);
    let url = location.protocol +
      '//' + location.host +
      location.pathname + "?" +
      params.toString();
    window.history.replaceState("Shmoogle", "Shmoogle", url);
  }

  public onShuffleToggle(event) {
    this.showShuffled.next(event);
  }

  public toggleType(event) {
    this.type = event.type;
    this.endpointPath = event.endpointPath;
    this.sendSearchRequest();
  }
}
