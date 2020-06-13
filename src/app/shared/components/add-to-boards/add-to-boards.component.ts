import { User } from './../../services/auth/user.model';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-boards',
  templateUrl: './add-to-boards.component.html',
  styleUrls: ['./add-to-boards.component.scss']
})
export class AddToBoardsComponent implements OnInit {
  isHovered = false;
  user: null | User;
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.authservice.user.subscribe(res => {
      this.user = res;
    });
  }

}
