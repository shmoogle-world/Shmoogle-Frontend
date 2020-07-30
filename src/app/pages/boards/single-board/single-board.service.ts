import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/services/auth/user.model';
import { Board } from '../board.model';
import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class SingleBoardService implements OnDestroy {

  board: Board;
  private backupBoard: Board;
  private id: number;
  isBoardOwner = new BehaviorSubject<boolean>(false);
  user: User;
  authSub: Subscription;
  editMode: boolean = false;

  constructor(private router: Router,
    private http: HttpClient,
    private authService: AuthService) {
    this.authSub = this.authService.user.subscribe((res) => {
      this.user = res;
    });

    this.id = +this.router.parseUrl(this.router.url).root.children.primary.segments[1];

    this.http.get<any>(`${environment.apiEndpoint}board/${this.id}`).subscribe(
      (res) => {
        this.board = res;
        this.isBoardOwner.next(this.user.id == this.board.user_id);
      }
    );
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  startEdit() {
    this.editMode = true;
    this.backupBoard = cloneDeep(this.board);
  }

  cancelEdit() {
    if(confirm("Are you sure that you wish to cancel? The changes will not be saved.")) {
      this.board = cloneDeep(this.backupBoard);
      this.editMode = false;
      this.backupBoard = null;
    }
  }

  endEdit() {

  }
  reorderItems(e: CdkDragSortEvent) {
    const tmp = this.board.items[e.previousIndex];
    this.board.items[e.previousIndex] = this.board.items[e.currentIndex];
    this.board.items[e.currentIndex] = tmp;
  }
}
