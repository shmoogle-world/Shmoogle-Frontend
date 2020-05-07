import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  userForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  constructor(private authservice: AuthService,
    private router: Router,
    private location: Location,
    private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.router.url === '/login') {
      this.location.replaceState('/');
    }
  }

  async onLoginSubmit() {
    this.userForm.get('email').setErrors(null);
    this.userForm.get('password').setErrors(null);
    this.authservice.login(this.userForm.value).subscribe((res) => {
      this.userForm.reset();
      this.dialogRef.close();
    }, (error) => {
      if (error === 'This email exists already')
        this.userForm.get('email').setErrors({ 'DoesntExist': true });
      if (error === 'This password is not correct.')
        this.userForm.get('password').setErrors({ 'Incorrect': true });

      console.log("login error", error);
    });
  }

  signupRedirect(e: any) {
    e.preventDefault();
    this.router.navigate(["signup"]);
    this.dialogRef.close();
  }
  onForgotPassword(e: any) {
    e.preventDefault();
    alert("This function is not yet implemented!\nSorry for the inconveniece.");
  }
}
