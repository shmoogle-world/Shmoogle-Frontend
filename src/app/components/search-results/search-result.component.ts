import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    HostListener,
    Input
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GoogleAnalyticsEventsService } from "../../Services/analytics/analytic-sercice/analytic-sercice.component";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from '../../Services/globals.service';
import { SearchResultService } from './search-result.service';

@Component({
    selector: "app-result",
    templateUrl: "./search-result.component.html",
    styleUrls: ["./search-result.component.css"]
})
export class SearchResultComponent implements OnInit {
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
    public imagesSearch: boolean = false;
    private type: string = 'text';
    //#endregion

    //#region Constructor & Lifecycle Hooks
    constructor(
        private globals: GlobalsService,
        public httpservice: HttpClient,
        public analyticservice: GoogleAnalyticsEventsService,
        public navservice: Router,
        private route: ActivatedRoute,
        private tRService: SearchResultService,
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
