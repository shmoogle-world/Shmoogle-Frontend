import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../../board.model';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {
  
  @Input() board: Board;
  constructor() { }

  ngOnInit(): void {
  }

}
