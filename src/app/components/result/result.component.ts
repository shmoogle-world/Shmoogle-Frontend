import {
    Component,
    OnInit,
    Input,
    OnDestroy,
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

@Component({
    selector: "app-result",
    templateUrl: "./result.component.html",
    styleUrls: ["./result.component.css"]
})
export class ResultComponent implements OnInit, OnDestroy {
    //#region Public Members
    @Input() results: ResultModel[];
    @Input() unshuffled: ResultModel[];
    public text: string;
    public counter: number = 0;
    public loadingAnimation: boolean = false;
    public elapsed: number;
    private mobile: boolean;
    private shuffled: boolean = true;
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
            this.text = "Never Gonna Give You Up";
        }
        this.mobile = this.detectmob();
        console.log(this.mobile);
        this.search();
    }

    public ngOnDestroy(): void {
    }

    //#endregion

    //#region Public Members

    public requestSearch(): void {
        sessionStorage.clear();
        this.search();
    }
    /*
     * Searches in bing motor
     */
    public search(): void {
        window.scrollTo(0, 0);
        if (this.text === "") this.text = "never gonna give you up - rick astley";

        if (sessionStorage.cache) {
            if (sessionStorage.search) {
                if (this.text == sessionStorage.search) {
                    let storage = sessionStorage.getItem("cache_res");
                    let unshuff = sessionStorage.getItem("cache_unshuf");
                    this.results = JSON.parse(storage);
                    this.unshuffled = JSON.parse(unshuff);
                    this.counter = this.results.length;
                    this.elapsed = parseFloat(sessionStorage.getItem("elapsed"));
                    return;
                }
            }
        }

        this.loadingAnimation = true;
        this.analyticservice.emitEvent("ClickCategory", this.text, "ClickLabel", 1);

        const initTime = new Date().getTime();
        this.httpservice
            .get(
                "https://bingsearchapiv1.azurewebsites.net/api/search/" + this.text +"?key=1251abfa-efe5-4225-a074-1f7897fb0054"
            )
            .subscribe(
                (response: any) => {
                    console.log(response);
                    this.results = response[1];
                    this.unshuffled = response[0];
                    this.counter = this.results.length;

                    this.loadingAnimation = false;

                    sessionStorage.setItem("search", this.text);
                    sessionStorage.setItem("cache_res", JSON.stringify(this.results));
                    sessionStorage.setItem("cache_unshuf", JSON.stringify(this.unshuffled));

                    this.resultservice.text = this.text;
                    let time = (new Date().getTime() - initTime) / 1000;
                    this.elapsed = parseFloat(time.toPrecision(3));
                    sessionStorage.setItem("elapsed", time.toPrecision(3));

                    this.decode();
                },
                error => {
                    console.log(error);
                }
            );
    }

    /**
     * Checks if the button enter was pressed
     * @param e
     */
    public CheckEnterKey(e) {
        if (e.keyCode == 13) {
            this.search();
        } else {
            return;
        }
    }

    /**
     * Navigates to home page
     */
    public returnHome(): void {
        //this.resultservice.landing = true;
        this.navservice.navigateByUrl("/");
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
        console.log(window.innerWidth);
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
