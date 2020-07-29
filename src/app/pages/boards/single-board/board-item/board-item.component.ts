import { Component, OnInit, Input } from '@angular/core';
import { BoardItem } from '../../board.model';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {
  
  @Input() item: BoardItem;
  @Input() editable: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }
  linkPressed(e: any) {
    if(this.editable) {
      e.preventDefault();
    }
  }
}
