import { UserInfoComponent } from './user-info/user-info.component';
import { IconComponent } from './../branding/icon/icon.component';
import { LogoComponent } from './../branding/logo/logo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
  ],

  exports: [
    IconComponent,
    LogoComponent,
    UserInfoComponent
  ]
})
export class SharedModule { }
