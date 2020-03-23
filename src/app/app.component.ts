import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

declare var $;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  public cookieValue = 'UNKNOWN';

  constructor(public cookieService: CookieService) { }

  ngOnInit() {
  }

}
