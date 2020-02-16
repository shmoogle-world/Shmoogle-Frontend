import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { GlobalsService } from '../../Services/globals.service';
import { Subject } from 'rxjs';
import { map} from 'rxjs/operators';
import { TextResult } from './models/text-result.model';
import { SearchResults } from './search-results.model';
import { ImageResult } from './models/image-result.model';
@Injectable()
export class SearchResultService {

    public resultsChanged = new Subject<SearchResults>();
    private results: SearchResults = new SearchResults();
    public requestPendingChanged = new Subject<boolean>();
    public requestPending: boolean = false;
    
    public searchText: string;
    public isMobile: boolean;
    public showShuffled: boolean = true;
    public noResults: boolean = false;
    public wrongURL: boolean = false;
    public endpointPath: string = "search/";
    private type: string = 'text';
    constructor(public http: HttpClient,
        private globals: GlobalsService,
        public navservice: Router,
        ) { }


   //#region Caching
        
    public set searchResults(newResults: SearchResults) {
        this.results = newResults;
        this.resultsChanged.next(newResults);
    }

    private set searchRequestPending(v: boolean) {
        this.requestPending = true;
        this.requestPendingChanged.next(v);
    }
    
    public get searchResults() : SearchResults {
        return this.results;
    }
    
 
    public validCacheExists(): boolean {
        return sessionStorage.chache_shuffled &&
            sessionStorage.search &&
            this.searchText == sessionStorage.search && sessionStorage.type == this.type;
    }

    public getCache(): void {
        this.type = sessionStorage.getItem("type");
        const shuffled = <TextResult[]> JSON.parse(sessionStorage.getItem("chache_shuffled"));
        const searchResults = new SearchResults(
            shuffled,
            <TextResult[]> JSON.parse(sessionStorage.getItem("chache_unshuffled")),
            shuffled.length,
            parseFloat(sessionStorage.getItem("elapsed")),
        );
        this.searchResults = searchResults;
    }

    public setCache(searchResults: SearchResults) {
        sessionStorage.setItem("type", this.type);
        sessionStorage.setItem("search", this.searchText);
        sessionStorage.setItem("chache_shuffled", JSON.stringify(searchResults.shuffled));
        sessionStorage.setItem("chache_unshuffled", JSON.stringify(searchResults.unshuffled));
        sessionStorage.setItem("elapsed", searchResults.elapsed.toString());
    }

    //#endregion 

    public onSearch(text) {
        this.searchText = text;
        this.sendSearchQuery();
    }

    public onShuffleToggle(event) {
        this.showShuffled = event;
    }

    public toggleType(event) {
        this.type = event.type;
        this.endpointPath = event.endpointPath;
        this.sendSearchQuery();
    }
    //#region Public Members

    public sendSearchQuery(): void {
        this.noResults = false;
        window.scrollTo(0, 0);
        if (this.searchText === "") this.navservice.navigateByUrl("/");

        if (this.validCacheExists()) {
            this.getCache();
            return;
        }
        this.setParam("q", this.searchText);

        this.searchRequestPending = true;

        const initialSearchTime = new Date().getTime();
        this.http.get<[TextResult[] | ImageResult[], TextResult[] | ImageResult[]]>(
                `${this.globals.baseUrl}/api/${this.endpointPath}${this.searchText}?key=${this.globals.apiKey}`
            ).pipe(map(response => {
                for (let i = 0; i < response[0].length; ++i) {
                    if(response[0][i].hasOwnProperty("url")) {
                        const tmp1 = response[0][i];
                        const tmp2 = response[1][i];
                        // @ts-ignore
                        response[0][i].url = decodeURI(tmp1.url);
                        // @ts-ignore
                        response[1][i].url = decodeURI(tmp2.url);
                    }
                }
                return response;
            }))
            .subscribe(
                this.handleSearchResponse.bind(this, initialSearchTime),
                error => {
                    console.log(error.error);
                    this.noResultsReceived();
                    this.wrongURL = true;
                }
            );
    }

    private handleSearchResponse(initialSearchTime: number, response: [(TextResult[] | ImageResult[]), (TextResult[] | ImageResult[])]) {
        
        //@ts-ignore
        if (response[0].error) {
            this.noResultsReceived();
            sessionStorage.clear();
            return;
        }

        const searchResults = new SearchResults(
            response[1],
            response[0],
            response[0].length,
            (new Date().getTime() - initialSearchTime) / 1000
        );

        this.setCache(searchResults);
        this.searchResults = searchResults;
        this.searchRequestPending = false;
    }

    public noResultsReceived() {
        this.searchResults = new SearchResults();
        this.searchRequestPending = false;
        this.noResults = true;
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
}
