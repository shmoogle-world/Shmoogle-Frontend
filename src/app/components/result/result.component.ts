import {
    Component,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    HostListener
} from "@angular/core";
import { ResultModel } from "../../Models/resultmodel";
import { ResultsServiceService } from "../../Services/results-service.service";
import { HttpClient } from "@angular/common/http";
import { GoogleAnalyticsEventsService } from "../../Services/analytics/analytic-sercice/analytic-sercice.component";
import { Router } from "@angular/router";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { ErrorDialogBoxComponent } from "../error-dialog-box/error-dialog-box.component";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { LandingComponent } from "../landing/landing.component";
import { decode } from '@angular/router/src/url_tree';
import { shuffle } from 'lodash';

@Component({
    selector: "app-result",
    templateUrl: "./result.component.html",
    styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit {
    //#region Public Members
    @Input() results: ResultModel[];
    @Input() unshuffled: ResultModel[];
    public text: string;
    public counter: number = 0;
    public loadingAnimation: boolean = false;
    public elapsed: number;
    public mobile: boolean;
    public shuffled: boolean = true;
    public noResults: boolean = false;
    private apiKey: string = 'c467fa56-5c12-4ff8-8e32-38ca6e903ea1';
    public data:boolean = false;
    //#endregion

    //#region Constructor & Lifecycle Hooks
    constructor(
        public resultservice: ResultsServiceService,
        public httpservice: HttpClient,
        public analyticservice: GoogleAnalyticsEventsService,
        public navservice: Router,
        private dialog: MatDialog,
        private spinerservice: Ng4LoadingSpinnerService
    ) { }

    ngOnInit() {
        if (!(this.text = sessionStorage.search)) {
            this.navservice.navigateByUrl("/")
        }
        this.mobile = this.detectmob();
        this.search();
    }
    //#endregion

    //#region Public Members

    public requestSearch(): void {
        if(this.cacheIsValid(this.text)) {
            this.results = shuffle(this.results);
            sessionStorage.setItem("cache_res", JSON.stringify(this.results));
        } else {
            this.search();
        }
    }

    /**
     * Checks if the current search request already exists in the cache.
     * 
     * @param searchTerm lookup term
     */
    private cacheIsValid(searchTerm: string): boolean {
        return sessionStorage.cache_res &&
            sessionStorage.search && 
            searchTerm == sessionStorage.search;
    } 

    /*
     * Searches in bing motor
     */
    public search(): void {
        this.data = false;
        this.noResults = false;
        window.scrollTo(0, 0);
        if (this.text === "") this.navservice.navigateByUrl("/");
        if (this.cacheIsValid(this.text)) {
            this.results = JSON.parse(sessionStorage.getItem("cache_res"));
            this.unshuffled = JSON.parse(sessionStorage.getItem("cache_unshuf"));
            this.counter = this.results.length;
            this.elapsed = parseFloat(sessionStorage.getItem("elapsed"));
            this.data = true;
            return;
        }
    
        this.loadingAnimation = true;
        this.analyticservice.emitEvent("ClickCategory", this.text, "ClickLabel", 1);

        const initTime = new Date().getTime();
        this.httpservice
            .get(
                `https://shmoogle.azurewebsites.net/api/search/${this.text}?key=${this.apiKey}`
            )
            .subscribe(
                (response: any) => {
                    if(response[0].error){
                        this.noResults = true;
                        this.loadingAnimation = false;
                        sessionStorage.clear();
                        return;
                    }
                    this.results = response[1];
                    this.unshuffled = response[0];
                    this.decode();
                    this.counter = this.results.length;
                    this.loadingAnimation = false;

                    sessionStorage.setItem("search", this.text);
                    sessionStorage.setItem("cache_res", JSON.stringify(this.results));
                    sessionStorage.setItem("cache_unshuf", JSON.stringify(this.unshuffled));

                    this.resultservice.text = this.text;
                    let time = (new Date().getTime() - initTime) / 1000;
                    this.elapsed = parseFloat(time.toPrecision(3));
                    sessionStorage.setItem("elapsed", time.toPrecision(3));
                    this.data = true;
                },
                error => {
                    console.log(error);
                }
            );
    }
    
    /**
     * Opens the error dialog box
     */
    public openDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = "500px";
        dialogConfig.width = "500px";
        dialogConfig.panelClass = "dialog";
        this.dialog.open(ErrorDialogBoxComponent, dialogConfig);
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
    private detectmob() {
        if (window.innerWidth <= 540) {
            return true;
        } else {
            return false;
        }
    }

    //need to figure out a better way of decoding the urls
    private decode(): void {
        for (let i = 0; i < this.results.length; ++i) {
            let tmp1: ResultModel = this.results[i];
            let tmp2: ResultModel = this.unshuffled[i];

            tmp1.url = decodeURI(tmp1.url);
            tmp2.url = decodeURI(tmp2.url);
        }
    }

    /**
     * swappes variables and changes text of button
     */
    private swap(): void {
        this.shuffled = !this.shuffled;
        const btn = document.querySelector('#shuffleBtn .mat-button-wrapper');
        if (btn.innerHTML == "Shuffled")
            btn.innerHTML = "Unshuffled";
        else
            btn.innerHTML = "Shuffled";
    }

    private toggle(): void{
        this.shuffled = !this.shuffled;
    }

    //#endregion
}
