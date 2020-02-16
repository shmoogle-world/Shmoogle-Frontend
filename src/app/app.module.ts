import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatMenuModule, MatSlideToggleModule } from "@angular/material";
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { CookieService } from 'ngx-cookie-service';
import { NgxWebstorageModule } from 'ngx-webstorage';
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
        NgxWebstorageModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        // SearchResultsModule,
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
