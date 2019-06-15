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
  public text: string;
  public counter: number = 0;
  public loadingAnimation: boolean = false;
  //#endregion

  //#region Constructor & Lifecycle Hooks
  constructor(
    public resultservice: ResultsServiceService,
    public httpservice: HttpClient,
    public analyticservice: GoogleAnalyticsEventsService,
    public navservice: Router,
    private dialog: MatDialog,
    private spinerservice: Ng4LoadingSpinnerService
  ) {}

  ngOnInit() {
    let storage = sessionStorage.getItem("search");
    if (storage !== 'undefined') {
      this.text = storage;
      this.search();
    }
  }

  public ngOnDestroy(): void {
    //localStorage.clear();
  }
  //#endregion

  //#region Public Members
  /*
   * Searches in bing motor
   */
  public search(): void {
    //moves to top of the page
    window.scrollTo(0, 0);

    if (this.text === "") this.text = "never gonna give you up - rick astley";

    let storage = sessionStorage.getItem("cache");
    if (storage !== 'undefined') {
      let search = sessionStorage.getItem("search");
      if (search !== 'undefined') {
        if (this.text == search) {
          this.results = JSON.parse(storage);
          return;
        }
      }
    }

    this.loadingAnimation = true;
    this.analyticservice.emitEvent("ClickCategory", this.text, "ClickLabel", 1);

    this.httpservice
      .get(
        "https://bingsearchapiv1.azurewebsites.net/shmoogleShuffle/" + this.text
      )
      .subscribe(
        (response: ResultModel[]) => {
          this.results = response;
          this.counter = response.length;
          this.loadingAnimation = false;
          sessionStorage.setItem('search',this.text);
          sessionStorage.setItem("cache", JSON.stringify(this.results));
          this.resultservice.text = this.text;
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
