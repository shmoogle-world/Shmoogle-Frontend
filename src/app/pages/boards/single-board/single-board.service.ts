import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { User } from '../../../shared/services/auth/user.model';
import { Board } from '../board.model';

@Injectable({
  providedIn: 'root'
})
export class SingleBoardService implements OnDestroy {

  board: Board;
  private id: number;
  isBoardOwner = new BehaviorSubject<boolean>(false);
  user: User;
  authSub: Subscription;


  constructor(private router: Router,
    private http: HttpClient,
    private authService: AuthService) {
    this.authSub = this.authService.user.subscribe((res) => {
      this.user = res;
    });

    this.id = +this.router.parseUrl(this.router.url).root.children.primary.segments[1];

    this.http.get<any>(`${environment.apiEndpoint}board/${this.id}`).subscribe(
      (res) => {
        this.board = res.data;
        this.isBoardOwner.next(this.user.id == this.board.user_id);
      }
    );
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
