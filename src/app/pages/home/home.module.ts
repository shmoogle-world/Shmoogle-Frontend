import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HamburgerNavComponent } from './hamburger-nav/hamburger-nav.component';
import { SharedModule } from '../../shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
]

@NgModule({
  declarations: [
    HomeComponent,
    HamburgerNavComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [
  ]
})
export class HomeModule { }
