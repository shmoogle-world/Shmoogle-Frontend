import { Component, OnInit } from '@angular/core';
import { SingleBoardService } from './single-board.service';

@Component({
  selector: 'app-single-board',
  templateUrl: './single-board.component.html',
  styleUrls: ['./single-board.component.scss']
})


export class SingleBoardComponent implements OnInit {

  
  constructor(public sbService: SingleBoardService) { }
  drop() {
    
  }
  ngOnInit(): void {
  }

  
  

}
