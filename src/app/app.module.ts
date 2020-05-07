import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { HamburgerNavComponent } from './pages/home/hamburger-nav/hamburger-nav.component';
import { HomeComponent } from './pages/home/home.component';
import { RouteModule } from './route.module';
import { LoginComponent } from './shared/components/user-info/login-modal/login-modal.component';
import { AnalyticsService } from './shared/services/analytics/analytics-service';
import { AuthService } from './shared/services/auth/auth.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HamburgerNavComponent,
    LoginComponent
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
    AnalyticsService,
    CookieService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
