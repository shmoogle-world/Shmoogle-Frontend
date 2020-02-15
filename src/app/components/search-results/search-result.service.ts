import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {

  constructor() { }


   //#region Caching

   public validCacheExists(): boolean {
    return sessionStorage.cache_res &&
        sessionStorage.search &&
        this.searchText == sessionStorage.search && sessionStorage.type == this.type;
}

public getCache(): void {
    let storage = sessionStorage.getItem("cache_res");
    let unshuff = sessionStorage.getItem("cache_unshuf");
    this.type = sessionStorage.getItem("type");
    this.shuffledSearchResults = JSON.parse(storage);
    this.unshuffledSearchResults = JSON.parse(unshuff);
    this.resultCount = this.shuffledSearchResults.length;
    this.elapsedSearchTime = parseFloat(sessionStorage.getItem("elapsed"));
}

public setCache(initialSearchTime) {
    sessionStorage.setItem("type", this.type);
    sessionStorage.setItem("search", this.searchText);
    sessionStorage.setItem("cache_res", JSON.stringify(this.shuffledSearchResults));
    sessionStorage.setItem("cache_unshuf", JSON.stringify(this.unshuffledSearchResults));
    let time = (new Date().getTime() - initialSearchTime) / 1000;
    this.elapsedSearchTime = parseFloat(time.toPrecision(3));
    sessionStorage.setItem("elapsed", time.toPrecision(3));
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
    this.imagesSearch = event.value;
    this.endpointPath = event.endpointPath;
    this.searchText = event.text;
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

    this.loadingAnimation = true;
    this.analyticservice.emitEvent("ClickCategory", this.searchText, "ClickLabel", 1);

    const initialSearchTime = new Date().getTime();
    this.httpservice
        .get(
            `${this.globals.baseUrl}/api/${this.endpointPath}${this.searchText}?key=${this.globals.apiKey}`
        )
        .subscribe(
            this.handleSearchResponse.bind(this, initialSearchTime),
            error => {
                console.log(error.error);
                this.noResultsReceived();
                this.wrongURL = true;
            }
        );
}

private handleSearchResponse(initialSearchTime: Date, response: any) {
    if (response[0].error) {
        this.noResultsReceived();
        sessionStorage.clear();
        return;
    }
    this.shuffledSearchResults = response[1];
    this.unshuffledSearchResults = response[0];
    this.resultCount = this.shuffledSearchResults.length;

    this.decodeSearchResults();
    this.setCache(initialSearchTime);
    this.loadingAnimation = false;
}

public noResultsReceived() {
    this.loadingAnimation = false;
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
