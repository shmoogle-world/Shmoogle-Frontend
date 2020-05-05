import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {

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
    this.authservice.signup(this.userForm.value).subscribe((res) => {
      this.userForm.reset();
      this.router.navigate(["/"]);
    }, (error) => {
      console.log("login error", error);
    });
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      c.get('confirmPassword').setErrors({'incorrect': true});
      return { invalid: true };
    }else
    c.get('confirmPassword').setErrors(null);
  }
}

