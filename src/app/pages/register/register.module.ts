import { SharedModule } from './../../shared/shared.module';
import { IconComponent } from './../../branding/icon/icon.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCardComponent } from './register-card/register-card.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
    { path: '', component: RegisterComponent }
]

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterCardComponent,
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
export class RegisterModule { }
