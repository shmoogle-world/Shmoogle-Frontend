import { User } from './../services/auth/user.model';
import { AuthService } from './../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from './login-modal/login-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {

  user: User = null;
  subscription: Subscription;

  constructor(private dialog: MatDialog,
    private navservice: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.navservice.url === '/login') {
      this.openLoginDialog();
    }

    this.subscription = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
  
  public openLoginDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "280px";
    dialogConfig.width = "262px";
    dialogConfig.panelClass = "loginModal";
    this.dialog.open(LoginComponent, dialogConfig);
  }
}