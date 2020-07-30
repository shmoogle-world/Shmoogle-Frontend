import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/services/auth/user.model';
import { Board } from '../board.model';
import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { cloneDeep, transform, difference, isEqual, isObject, merge} from 'lodash';
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

    this.http.get<Board>(`${environment.apiEndpoint}board/${this.id}`).subscribe(
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
    this.editMode = false;
    this.http.put<any>(`${environment.apiEndpoint}board/${this.id}`, {
      title: this.board.title,
      description: this.board.description,
      public: this.board.public,
      items: this.difference(this.backupBoard.items, this.board.items),
    }).subscribe(
      (res) => {
        this.backupBoard = null;
        console.log(res);
      }
    );
  }

  reorderItems(e: CdkDragSortEvent) {
    const tmp = this.board.items[e.previousIndex];
    this.board.items[e.previousIndex] = this.board.items[e.currentIndex];
    this.board.items[e.currentIndex] = tmp;
  }

  difference(object, base) {
    function changes(object, base) {
      return transform(object, function(result, value, key) {
        if (!isEqual(value, base[key])) {
          result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value;
        }
      });
    }
    return changes(object, base);
  }
}
