import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authservice: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async onLoginSubmit() {
    this.authservice.login(this.userForm.value).subscribe((res) => {
        this.userForm.reset();
    }, (error) => {
        console.log("login error", error);
    });
  }

  registerRedirect(e: any) {
    e.preventDefault();
    this.router.navigate(["register"]);
  }

}
