import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Board } from '../board.model';
import { User } from '../../../shared/services/auth/user.model';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleBoardService implements OnDestroy {

  board: Board;
  private id: number;
  isBoardOwner: boolean = false;
  user: User;
  authSub: Subscription;


  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService) {
    this.id = +this.route.snapshot.paramMap.get("board_id");

    this.authSub = this.authService.user.subscribe((res) => {
      this.user = res;
    });

    this.http.get<any>(`${environment.apiEndpoint}board/${this.id}`).subscribe(
      (res) => {
        this.board = res.data;
        this.isBoardOwner = this.user.id == this.board.user_id;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
