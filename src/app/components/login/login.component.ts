import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  loginURL: string = 'https://bingsearchapiv1.azurewebsites.net/login';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onLoginSubmit(): void {
    // TODO: Use EventEmitter with form value
    const result = this.httpClient.post(`${this.loginURL}`,this.userForm.value);
    console.log(result);
    this.userForm.reset();
    return;
  }

}
