import { LogoComponent } from './branding/logo/logo.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { ErrorDialogBoxComponent } from './components/error-dialog-box/error-dialog-box.component';
import { HamburgerNavComponent } from './components/hamburger-nav/hamburger-nav.component';
import { LandingComponent } from './components/landing/landing.component';
import { RouteModule } from './route.module';
import { GoogleAnalyticsEventsService } from './Services/analytics/analytic-sercice/analytic-sercice.component';
import { InsightsServiceComponent } from './Services/analytics/insights-service/insights-service.component';
import { GlobalsService } from './Services/globals.service';


@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        ErrorDialogBoxComponent,
        HamburgerNavComponent,
        LogoComponent,        
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        RouteModule,
    ],
    providers: [
        GlobalsService,
        GoogleAnalyticsEventsService,
        InsightsServiceComponent,
        CookieService
    ],
    bootstrap: [AppComponent],
    entryComponents: [ErrorDialogBoxComponent]
})
export class AppModule { }
