import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { IconComponent } from './../branding/icon/icon.component';
import { LogoComponent } from './../branding/logo/logo.component';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],

  exports: [
    IconComponent,
    LogoComponent,
    UserInfoComponent
  ]
})
export class SharedModule { }
