import { SharedModule } from './shared/shared.module';
import { UserInfoComponent } from './shared/user-info/user-info.component';
import { AuthService } from './shared/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
import { LoginComponent } from './shared/user-info/login-modal/login-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        ErrorDialogBoxComponent,
        HamburgerNavComponent,   
        LoginComponent,
        UserInfoComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        RouteModule,
        ReactiveFormsModule
    ],
    providers: [
        GlobalsService,
        GoogleAnalyticsEventsService,
        InsightsServiceComponent,
        CookieService,
        AuthService,
    ],
    bootstrap: [AppComponent],
    entryComponents: [ErrorDialogBoxComponent]
})
export class AppModule { }
