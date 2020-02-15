import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalsService } from './Services/globals.service';
import { GoogleAnalyticsEventsService } from './Services/analytics/analytic-sercice/analytic-sercice.component';
import { InsightsServiceComponent } from './Services/analytics/insights-service/insights-service.component';
import { MatDialogModule } from "@angular/material";
import { ErrorDialogBoxComponent } from './components/error-dialog-box/error-dialog-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HamburgerNavComponent } from './components/hamburger-nav/hamburger-nav.component';
import { MatMenuModule, MatButtonModule, MatSlideToggleModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { RouteModule } from './route.module';
import { SearchResultsModule } from './components/search-results/search-results.module';

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
