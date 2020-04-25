import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    displayName: new FormControl(''),
  });
  signUpURL: string = 'https://bingsearchapiv1.azurewebsites.net/signup';
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onSignUpSubmit(): void {
    console.log(this.userForm.value);
    const result = this.httpClient.post(`${this.signUpURL}`, this.userForm.value);
    console.log(result);
    this.userForm.reset();
    return;
  }

}

