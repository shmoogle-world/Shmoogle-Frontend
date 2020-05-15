import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AnimatedInputComponent } from './components/animated-input/animated-input.component';
import { IconComponent } from './components/branding/icon/icon.component';
import { LogoComponent } from './components/branding/logo/logo.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { LoginComponent } from './components/user-info/login-modal/login-modal.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SearchBarComponent } from '../pages/search-results/search-bar/search-bar.component';
import { SearchResultService } from '../pages/search-results/search-result.service';

@NgModule({
  declarations: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
    LoginComponent,
    SearchInputComponent,
    AnimatedInputComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
    SearchBarComponent,
    LoginComponent,
    SearchInputComponent,
    AnimatedInputComponent
  ],
  providers: [
    SearchResultService,
  ]
})
export class SharedModule { }
