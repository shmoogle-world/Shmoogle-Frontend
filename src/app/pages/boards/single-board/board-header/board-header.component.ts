import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../../board.model';
import { SingleBoardService } from '../single-board.service';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {
  

  constructor(public sbService: SingleBoardService) { }

  ngOnInit(): void {
  
  }

}
