import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from './shared/services/auth/auth.service';

declare var $;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  public cookieValue = 'UNKNOWN';

  constructor(public cookieService: CookieService,
    private authService: AuthService) { }

    ngOnInit() {
        this.authService.autoLogin();
    }

}
