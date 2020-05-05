import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from './login-modal/login-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private navservice: Router) { }

  ngOnInit(): void {
    if(this.navservice.url === '/login') {
        this.openLoginDialog();
    }
  }

    public openLoginDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.height = "280px";
        dialogConfig.width = "262px";
        dialogConfig.panelClass = "loginModal";
        this.dialog.open(LoginComponent, dialogConfig);

        // this.dialog.closeAll();
        // dialogConfig.afterClosed().subscribe(result => {
        //     console.log('The dialog was closed');
        //     // this.animal = result;
        // });
    }
    //#end LoginModal
}
