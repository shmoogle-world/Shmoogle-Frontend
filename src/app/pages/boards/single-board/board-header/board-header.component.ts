import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SingleBoardService } from '../single-board.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit, OnDestroy {
  
  isOwner: boolean = false;
  sub: Subscription;
  constructor(public sbService: SingleBoardService) { }
  
  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.sub = this.sbService.isBoardOwner.subscribe((res) => this.isOwner = res);
  }

  

}
