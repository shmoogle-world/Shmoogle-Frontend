import { SharedModule } from '../../shared/shared.module';
import { IconComponent } from '../../branding/icon/icon.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SignupCardComponent } from './signup-card/signup-card.component';
import { SignupComponent } from './signup.component';

const routes: Routes = [
    { path: '', component: SignupComponent }
]

@NgModule({
  declarations: [
    SignupComponent,
    SignupCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(
        routes,
    ),
  ]
})
export class SignupModule { }
