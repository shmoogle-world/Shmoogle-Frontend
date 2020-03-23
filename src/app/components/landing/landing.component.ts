import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { GoogleAnalyticsEventsService } from "../../Services/analytics/analytic-sercice/analytic-sercice.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ErrorDialogBoxComponent } from "../error-dialog-box/error-dialog-box.component";
import { AppComponent } from "../../app.component";
import { formatDate } from "@angular/common";
import { GlobalsService } from '../../Services/globals.service';

@Component({
    selector: "app-landing",
    templateUrl: "./landing.component.html",
    styleUrls: ["./landing.component.css"]
})

export class LandingComponent implements OnInit {
    //#region Public Members
    public text: string = "";
    public email: string = "";
    public error: boolean;
    public afterMail: boolean;
    public loadingAnimation: boolean = false;
    //#endregion

    // @LocalStorage()
    // public boundValue;

    //#region Constructor + LideCycle Hooks
    constructor(
        private globals: GlobalsService,
        private comp: AppComponent,
        public httpservice: HttpClient,
        public navservice: Router,
        public analyticservice: GoogleAnalyticsEventsService,
        private dialog: MatDialog,
    ) {
    }

    public ngOnInit(): void {
        sessionStorage.clear();

        if (!this.comp.cookieService.check("Subscribed")) {
            this.comp.cookieService.set(
                "Subscribed",
                "NewVisitor---" +
                formatDate(new Date(), "dd-mm-yyyy---h-MM-ss", "en-US")
            );
        }
        if (this.comp.cookieService.get("Subscribed").includes("NewVisitor")) {
            setTimeout(() => {
                var element = document.getElementById("footer");
                if (element !== null) {
                    element.style.visibility = "visible";
                    element.classList.add("animated");
                    element.classList.add("bounceInUp");
                }
            }, 3000);
        }
    }

    //#endregion

    //#region Public Methods
    public search(): void {
        if (this.text === "") 
            return;
        sessionStorage.setItem("search", this.text);
        sessionStorage.removeItem('cache_res');
        sessionStorage.removeItem('cache_unshuf');
        this.analyticservice.emitEvent("ClickCategory", this.text, "ClickLabel", 1);
        this.navservice.navigate([`/search`], { queryParams: {q: this.text }});
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
     * Opens the error dialog box
     */
    public openDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = "500px";
        dialogConfig.width = "500px";
        dialogConfig.panelClass = "dialog";
        this.dialog.open(ErrorDialogBoxComponent, dialogConfig);
    }

    /**
     * Closes error dialog box
     */
    public CloseDialogError(): void {
        this.dialog.closeAll();
    }

    /**
     * Send the email
     */
    public Send(): void {
        if (this.validateEmail(this.email)) {
            if (this.comp.cookieService.check("Subscribed"))
                this.comp.cookieService.delete("Subscribed");
            this.comp.cookieService.set(
                "Subscribed",
                "SubscribedVisitor---" +
                formatDate(new Date(), "dd-mm-yyyy---h-MM-ss", "en-US")
            );

            this.loadingAnimation = true;

            // this.EmailModel.email = this.email;
            //send to backend
            this.httpservice
                .get(
                    `${this.globals.baseUrl}/api/maillist/${this.email}?key=${this.globals.apiKey}`
                )
                .subscribe(
                    res => {
                        this.afterMail = true;
                        this.loadingAnimation = false;
                        setTimeout(() => {
                            var elem = document.getElementById("footer");
                            elem.style.display = "none";
                        }, 4000);
                    },
                    err => {
                        this.loadingAnimation = false;
                        this.openDialog();
                        console.log(err);
                    }
                );
        } else {
            this.error = true;
        }
    }

    /**
     * Close email box
     */
    public CloseEmail(): void {
        document.getElementById("footer").style.display = "none";
    }

    /**
     * Disable error on mail input
     * @param email
     */
    public DisableError(): void {
        if (this.error) this.error = false;
    }

    //#endregion

    //#region Private Methods

    private validateEmail(email): boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    //#endregion
}
