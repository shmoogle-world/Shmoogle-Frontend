import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {

  public email: string = "";
  public afterMail: boolean;
  public loadingAnimation: boolean;
  private validEmail = false;
  
  @ViewChild('footer') footer: any; 
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
          this.footer.nativeElement.style.visibility = "visible";
          this.footer.nativeElement.classList.add("animated");
          this.footer.nativeElement.classList.add("bounceInUp");
      }, 0);
    }
  }

  public send(): void {
    if (this.validEmail) {
      if (this.cookieService.check("Subscribed"))
        this.cookieService.delete("Subscribed");
      this.cookieService.set(
        "Subscribed",
        "SubscribedVisitor---" +
        formatDate(new Date(), "dd-mm-yyyy---h-MM-ss", "en-US")
      );
  
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
              this.closeEmail();
            }, 4000);
          },
          err => {
            this.loadingAnimation = false;
            console.log(err);
          }
        );
    }
  }

  onEmailChange(e) {
    this.email = e;
    this.validEmail = this.validateEmail(e);
  }

  public closeEmail(): void {
    this.footer.nativeElement.style.display = "none";
  }


  private validateEmail(email): boolean {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
