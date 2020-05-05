import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';

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
    private dialogRef:MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.router.url === '/login') {
        this.location.replaceState('/');
    }
  }

  async onLoginSubmit() {
    this.authservice.login(this.userForm.value).subscribe((res) => {
        this.userForm.reset();
        this.dialogRef.close();
    }, (error) => {
        console.log("login error", error);
    });
  }

  registerRedirect(e: any) {
    e.preventDefault();
    this.router.navigate(["signup"]);
    this.dialogRef.close();
  }
  onForgotPassword(e: any) {
    e.preventDefault();
    alert("This function is not yet implemented!\nSorry for the inconveniece.");
  }
}
