import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  public email: string = "";
  public error: boolean;
  public afterMail: boolean;
  public loadingAnimation: boolean;
  constructor(
    private cookieService: CookieService,
    private httpservice: HttpClient) { }

  ngOnInit(): void {
  
    if (!this.cookieService.check("Subscribed")) {
      this.cookieService.set(
        "Subscribed",
        "NewVisitor---" +
        formatDate(new Date(), "dd-mm-yyyy---h-MM-ss", "en-US")
      );
    }
    if (this.cookieService.get("Subscribed").includes("NewVisitor")) {
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
  /**
   * Send the email
   */
  public Send(): void {
    if (this.validateEmail(this.email)) {
      if (this.cookieService.check("Subscribed"))
        this.cookieService.delete("Subscribed");
      this.cookieService.set(
        "Subscribed",
        "SubscribedVisitor---" +
        formatDate(new Date(), "dd-mm-yyyy---h-MM-ss", "en-US")
      );
      // this.EmailModel.email = this.email;
      //send to backend\

      this.loadingAnimation = true;

      this.httpservice
        .get(
          `${environment.apiEndpoint}api/maillist/${this.email}?key=${environment.apiKey}`
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
