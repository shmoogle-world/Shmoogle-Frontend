import { AuthService } from '../../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup-card',
  templateUrl: './signup-card.component.html',
  styleUrls: ['./signup-card.component.css']
})
export class SignupCardComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    displayName: new FormControl(null, [Validators.required]),
  }, this.passwordConfirming);
  constructor(private authservice: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSignUpSubmit(): void {
    this.userForm.get('email').setErrors(null);
    this.authservice.signup(this.userForm.value).subscribe((res) => {
      this.userForm.reset();
      this.router.navigate(["/"]);
    }, (error) => {
      if (error === 'This email exists already')
        this.userForm.get('email').setErrors({ 'Taken': true });
      console.log("login error", error);
    });
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      c.get('confirmPassword').setErrors({ 'incorrect': true });
      return { invalid: true };
    } else
      c.get('confirmPassword').setErrors(null);
  }
}

