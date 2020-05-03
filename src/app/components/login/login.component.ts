import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from './../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

  async onLoginSubmit() {
    this.authservice.login(this.userForm.value).subscribe((res) => {
        this.userForm.reset();
    }, (error) => {
        console.log("login error", error);
    });
  }

}
