import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardItem } from '../../board.model';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {
  
  @Input() item: BoardItem;
  @Input() editable: boolean = false;
  @Output() delete = new EventEmitter<null>();
  constructor() { }

  ngOnInit(): void {
  }
  linkPressed(e: any) {
    if(this.editable) {
      e.preventDefault();
    }
  }
  markForDelete(e: any) {
    if(this.editable) {
      e.preventDefault();
      this.delete.emit();
    }
  }
}
