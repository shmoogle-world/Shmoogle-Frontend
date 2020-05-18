import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from '../../../environments/environment';
import { AppComponent } from "../../app.component";
import { AnalyticsService } from '../../shared/services/analytics/analytics-service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})

export class HomeComponent implements OnInit {
  //#region Public Members
  public text: string = "";
  public loadingAnimation: boolean = false;
  //#endregion

  // @LocalStorage()
  // public boundValue;

  //#region Constructor + LideCycle Hooks
  constructor(    
    public navservice: Router,
    public analyticservice: AnalyticsService,
  ) {
  }

  public ngOnInit(): void {
    sessionStorage.clear();
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
    this.navservice.navigate([`/search`], { queryParams: { q: this.text } });
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
}
