import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    displayName: new FormControl(''),
  });
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
}

