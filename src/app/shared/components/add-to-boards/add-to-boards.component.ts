import { NewBoardModalComponent } from './new-board-modal/new-board-modal.component';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Board, BoardItem } from '../../../pages/boards/board.model';
import { ImageResult } from '../../../pages/search-results/models/image-result.model';
import { WebResult } from '../../../pages/search-results/models/web-result.model';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../services/auth/user.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-boards',
  templateUrl: './add-to-boards.component.html',
  styleUrls: ['./add-to-boards.component.scss']
})
export class AddToBoardsComponent implements OnInit, OnDestroy {

  @Input() data: WebResult | ImageResult;

  user: null | User;
  boards: Board[];
  userSub: Subscription;
  boardSub: Subscription;
  addedToBoard: boolean = false;

  constructor(private authservice: AuthService,
    private http: HttpClient,
    private dialog: MatDialog) { }
  
  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.boardSub) {
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

  onChange(e: { source: MatSelect, value: number | string } | any) {

    switch (e.value) {

      case 'new': {

        const dialogRef = this.dialog.open(NewBoardModalComponent, {
          maxHeight: "100%",
          maxWidth: "300px",
          width: "90%",
          panelClass: "loginModal",
          
          data: this.parseSearchResult(),
        });
        dialogRef.afterClosed().subscribe((result: Boolean) => {
          if(result) {
            this.addedToBoard = true;
          }
        });
        
        e.source.writeValue(null);
        break;
      }
      case '': {
        break;
      }
      default: {
        this.addToBoard(e);
      }
    }
  }
  private parseSearchResult(): BoardItem {
    if ((this.data as WebResult).url) {
      this.data = <WebResult>this.data;
      return {
        title: this.data.name,
        url: this.data.url,
        snippet: this.data.snippet,
        last_crawled: new Date()
      };
    } else {
      this.data = <ImageResult>this.data;
      return {
        title: this.data.name,
        url: this.data.hostPageUrl,
        preview_image: this.data.contentUrl,
        last_crawled: new Date()
      }
    }
  }
  private addToBoard(e: { source: MatSelect, value: number | string } | any) {
    
    this.http.post(`${environment.apiEndpoint}board/${e.value}/search`, this.parseSearchResult())
      .subscribe(() => {

        this.addedToBoard = true;
      })
  }
}
