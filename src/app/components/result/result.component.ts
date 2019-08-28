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

        // const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        // if (width <= 425) {
        //     document.querySelector('#resBtn .mat-button-wrapper').innerHTML = 'Show';
        // }
        this.search();
    }

    public ngOnDestroy(): void {
    }

    //#endregion

    // public hideRes(): void {
    //     const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    //     const btn = document.querySelector('#resBtn .mat-button-wrapper');
    //     const shuffled = document.querySelector('#shuffled');
    //     const unshuffled = document.querySelector('#unshuffled');

    //     if (width <= 425) {
    //         if (btn.innerHTML == 'Show') {
    //             if (unshuffled.classList.contains('hidden'))
    //                 unshuffled.classList.remove('hidden');

    //             if (!shuffled.classList.contains('hidden'))
    //                 shuffled.classList.add('hidden');

    //             btn.innerHTML = 'Hide';
    //         }
    //         else {
    //             if (!unshuffled.classList.contains('hidden'))
    //                 unshuffled.classList.add('hidden');

    //             if (shuffled.classList.contains('hidden'))
    //                 shuffled.classList.remove('hidden');
    //             btn.innerHTML = 'Show';
    //         }
    //     } else {
    //         if (btn.innerHTML == 'Show Unshuffled') {
    //             if (shuffled.classList.contains('hidden'))
    //                 shuffled.classList.remove('hidden');

    //             if (unshuffled.classList.contains('hidden'))
    //                 unshuffled.classList.remove('hidden');

    //             btn.innerHTML = 'Hide Unshuffled';
    //         }
    //         else {
    //             if (!unshuffled.classList.contains('hidden'))
    //                 unshuffled.classList.add('hidden');

    //             btn.innerHTML = 'Show Unshuffled';
    //         }
    //     }

    // }

    //#region Public Members

    public requestSearch(): void {
        sessionStorage.clear();
        this.search();
    }
    /*
     * Searches in bing motor
     */
    public search(): void {
        //moves to top of the page
        window.scrollTo(0, 0);
        // const btn = document.querySelector('#resBtn .mat-button-wrapper');
        // const shuffled = document.querySelector('#shuffled');
        // const unshuffled = document.querySelector('#unshuffled');

        // if (!unshuffled.classList.contains('hidden') && btn.innerHTML == 'Hide Unshuffled') {
        //     if (shuffled.classList.contains('hidden'))
        //         shuffled.classList.remove('hidden');
        //     unshuffled.classList.add('hidden');
        //     btn.innerHTML = 'Show Unshuffled';
        // }
        if (this.text === "") this.text = "never gonna give you up - rick astley";

        if (sessionStorage.cache) {
            if (sessionStorage.search) {
                if (this.text == sessionStorage.search) {
                    let storage = sessionStorage.getItem("cache");
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
                "https://bingsearchapi.azurewebsites.net/shmoogleShuffle/" + this.text
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
                },
                error => {
                    console.log(error);
                }
            );

        //add epalsed time for search
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
}
