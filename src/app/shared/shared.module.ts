import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../pages/search-results/search-bar/search-bar.component';
import { SearchResultService } from '../pages/search-results/search-result.service';
import { AddToBoardsIconComponent } from './components/add-to-boards/add-to-boards-icon/add-to-boards-icon.component';
import { AddToBoardsComponent } from './components/add-to-boards/add-to-boards.component';
import { AnimatedInputComponent } from './components/animated-input/animated-input.component';
import { IconComponent } from './components/branding/icon/icon.component';
import { LogoComponent } from './components/branding/logo/logo.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { LoginComponent } from './components/user-info/login-modal/login-modal.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NewBoardModalComponent } from './components/add-to-boards/new-board-modal/new-board-modal.component';

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
    SearchBarComponent,
    LoaderComponent,
    NewBoardModalComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
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
    AnimatedInputComponent,
    AddToBoardsComponent,
    LoaderComponent
  ],
  providers: [
    SearchResultService,
  ]
})
export class SharedModule { }
