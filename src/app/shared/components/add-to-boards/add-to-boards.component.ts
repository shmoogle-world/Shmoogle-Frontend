import { User } from './../../services/auth/user.model';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Board } from '../../../pages/boards/board.model';
import { Subscription } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-to-boards',
  templateUrl: './add-to-boards.component.html',
  styleUrls: ['./add-to-boards.component.scss']
})
export class AddToBoardsComponent implements OnInit, OnDestroy {
  isHovered = true;
  user: null | User;
  boards: Board[];
  userSub: Subscription;
  boardSub: Subscription;

  addedToBoard: boolean = false;
  sForm: FormGroup;
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

  onChange(e: {source: MatSelect, value: number | string} | any) {
    
    switch(e.value) {
    
      case 'new':  {
        e.source.writeValue(null);
        alert("This Function has yet to be completed");
        break;
      }
      case '': {
        break;
      }
      default: {
        this.addedToBoard = true;
      }
    }
  }

}
