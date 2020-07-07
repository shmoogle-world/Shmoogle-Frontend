import { SearchBarComponent } from './pages/search-results/search-bar/search-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { RouteModule } from './route.module';
import { AnalyticsService } from './shared/services/analytics/analytics-service';
import { AuthService } from './shared/services/auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorService } from './shared/services/auth/auth-interceptor.service';


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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
