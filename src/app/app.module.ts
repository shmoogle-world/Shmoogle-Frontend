import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { RouteModule } from './route.module';
import { AnalyticsService } from './shared/services/analytics/analytics-service';
import { AuthService } from './shared/services/auth/auth.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    RouteModule,
    HttpClientModule,
  ],
  providers: [
    AnalyticsService,
    CookieService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
