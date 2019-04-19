import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './components/result/result.component';
import { ResultsServiceService } from './Services/results-service.service';
import { GoogleAnalyticsEventsService } from './Services/analytics/analytic-sercice/analytic-sercice.component';
import { InsightsServiceComponent } from './Services/analytics/insights-service/insights-service.component';
import { MatDialogModule } from "@angular/material";
import { ErrorDialogBoxComponent } from './components/error-dialog-box/error-dialog-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HamburgerNavComponent } from './components/hamburger-nav/hamburger-nav.component';
import { MatMenuModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { NgxWebstorageModule } from 'ngx-webstorage';


const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'results', component:  ResultComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: '**', component: LandingComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ResultComponent,
    ErrorDialogBoxComponent,
    AboutUsComponent,
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
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    ResultsServiceService,
    GoogleAnalyticsEventsService,
    InsightsServiceComponent,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogBoxComponent]
})
export class AppModule { }
