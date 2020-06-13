import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { AddToBoardsIconComponent } from './components/add-to-boards/add-to-boards-icon/add-to-boards-icon.component';
import { AddToBoardsComponent } from './components/add-to-boards/add-to-boards.component';
import { AnimatedInputComponent } from './components/animated-input/animated-input.component';
import { IconComponent } from './components/branding/icon/icon.component';
import { LogoComponent } from './components/branding/logo/logo.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { LoginComponent } from './components/user-info/login-modal/login-modal.component';
import { UserInfoComponent } from './components/user-info/user-info.component';


@NgModule({
  declarations: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
    LoginComponent,
    SearchInputComponent,
    AnimatedInputComponent,
    AddToBoardsComponent,
    AddToBoardsIconComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    IconComponent,
    LogoComponent,
    UserInfoComponent,
    LoginComponent,
    SearchInputComponent,
    AnimatedInputComponent,
    AddToBoardsComponent
  ]
})
export class SharedModule { }
