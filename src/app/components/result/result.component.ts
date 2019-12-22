import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    HostListener
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GoogleAnalyticsEventsService } from "../../Services/analytics/analytic-sercice/analytic-sercice.component";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from '../../Services/globals.service';

@Component({
    selector: "app-result",
    templateUrl: "./result.component.html",
    styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
    //#region Public Members
    public shuffledSearchResults: any;
    public unshuffledSearchResults: any;
    public searchText: string;
    public resultCount: number = 0;
    public loadingAnimation: boolean = false;
    public elapsedSearchTime: number;
    public isMobile: boolean;
    public showShuffled: boolean = true;
    public noResults: boolean = false;
    public wrongURL: boolean = false;
    public endpointPath: string = "search/";
    //#endregion

    //#region Constructor & Lifecycle Hooks
    constructor(
        private globals: GlobalsService,
        public httpservice: HttpClient,
        public analyticservice: GoogleAnalyticsEventsService,
        public navservice: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        
        this.isMobile = this.checkIsMobile();
        this.route.queryParams.subscribe(params => {
            this.searchText = params['q'];
            if (this.searchText == undefined) {
                this.navservice.navigateByUrl("/");
            }
        });
        this.sendSearchQuery();
    }


    //#endregion

    //#region Caching

    public validCacheExists(): boolean {
        return sessionStorage.cache_res && 
            sessionStorage.search && 
            this.searchText == sessionStorage.search;
    }

    public getCache(): void {
        let storage = sessionStorage.getItem("cache_res");
        let unshuff = sessionStorage.getItem("cache_unshuf");
        this.shuffledSearchResults = JSON.parse(storage);
        this.unshuffledSearchResults = JSON.parse(unshuff);
        this.resultCount = this.shuffledSearchResults.length;
        this.elapsedSearchTime = parseFloat(sessionStorage.getItem("elapsed"));
    }
    
    public setCache(initialSearchTime) {
        sessionStorage.setItem("search", this.searchText);
        sessionStorage.setItem("cache_res", JSON.stringify(this.shuffledSearchResults));
        sessionStorage.setItem("cache_unshuf", JSON.stringify(this.unshuffledSearchResults));
        let time = (new Date().getTime() - initialSearchTime) / 1000;
        this.elapsedSearchTime = parseFloat(time.toPrecision(3));
        sessionStorage.setItem("elapsed", time.toPrecision(3));
    }

    //#endregion 
    
    //#region Public Members
    
    public sendSearchQuery(): void {
        this.noResults = false;
        window.scrollTo(0, 0);
        
        if (this.searchText === "") this.navservice.navigateByUrl("/");
        
        if(this.validCacheExists()) {
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
        if(response[0].error){
            this.noResultsReceived();
            sessionStorage.clear();
            return;
        }
        this.shuffledSearchResults = response[1];
        this.unshuffledSearchResults = response[0];
        this.resultCount = this.shuffledSearchResults.length;
        
        this.decodeSearchResults();
        this.setCache(initialSearchTime);
        console.log(response);
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

    //#endregion

    //#region Sticky Nav

    @ViewChild("stickyMenu") menuElement: ElementRef;

    sticky: boolean = false;
    elementPosition: any;

    ngAfterViewInit() {
        this.elementPosition = this.menuElement.nativeElement.offsetTop;
    }

    @HostListener("window:scroll", ["$event"])
    handleScroll() {
        const windowScroll = window.pageYOffset;
        if (windowScroll >= this.elementPosition + 120) {
            this.sticky = true;
        } else {
            this.sticky = false;
        }
    }

    //#endregion

    //#region private methods

    /**
     * detects if we are in mobile view or not
     */
    private checkIsMobile() {
        if (window.innerWidth <= 540) {
            return true;
        } else {
            return false;
        }
    }

    //need to figure out a better way of decoding the urls
    private decodeSearchResults(): void {
        for (let i = 0; i < this.shuffledSearchResults.length; ++i) {
            let tmp1 = this.shuffledSearchResults[i];
            let tmp2 = this.unshuffledSearchResults[i];

            tmp1.url = decodeURI(tmp1.url);
            tmp2.url = decodeURI(tmp2.url);
        }
    }
    //#endregion
}
