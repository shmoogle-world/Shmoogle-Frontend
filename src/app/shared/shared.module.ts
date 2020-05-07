import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { IconComponent } from './../branding/icon/icon.component';
import { LogoComponent } from './../branding/logo/logo.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { LoginComponent } from './components/user-info/login-modal/login-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
    LoginComponent
  ]
})
export class SharedModule { }
