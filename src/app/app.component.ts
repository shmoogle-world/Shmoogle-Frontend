import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Location } from '@angular/common';

declare var $;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  //ng build --prod --base-href /public_html  --deploy-url /shmoogleV3/
  public cookieValue = 'UNKNOWN';

  constructor(public cookieService: CookieService) { }

  ngOnInit() {
  }

}
