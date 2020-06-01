import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { IconComponent } from './components/branding/icon/icon.component';
import { LogoComponent } from './components/branding/logo/logo.component';
import { LoginComponent } from './components/user-info/login-modal/login-modal.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { AnimatedInputComponent } from './components/animated-input/animated-input.component';
@NgModule({
  declarations: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
    LoginComponent,
    SearchInputComponent,
    AnimatedInputComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],

  exports: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
    LoginComponent,
    SearchInputComponent,
    AnimatedInputComponent
  ]
})
export class SharedModule { }
