import { User } from './../../services/auth/user.model';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board } from '../../../pages/boards/board.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-to-boards',
  templateUrl: './add-to-boards.component.html',
  styleUrls: ['./add-to-boards.component.scss']
})
export class AddToBoardsComponent implements OnInit, OnDestroy {
  isHovered = false;
  user: null | User;
  boards: Board[];
  userSub: Subscription;
  boardSub: Subscription;
  constructor(private authservice: AuthService) { }
  ngOnDestroy(): void {
    if(this.userSub) {
      this.userSub.unsubscribe();
    }
    if(this.boardSub) {
      this.boardSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.userSub = this.authservice.user.subscribe(res => {
      this.user = res;
    });
    this.boardSub = this.authservice.userBoards.subscribe(boards => {
      this.boards = boards;
    })
  }

}
