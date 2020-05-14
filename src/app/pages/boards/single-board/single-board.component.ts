import { Component, OnInit } from '@angular/core';
import { Board } from '../board.model';
@Component({
  selector: 'app-single-board',
  templateUrl: './single-board.component.html',
  styleUrls: ['./single-board.component.scss']
})


export class SingleBoardComponent implements OnInit {

  constructor() { }
  board: Board = {
    id: 1,
    title: "test",
    public: true,
    created_at: 1,
    updated_at: 2,
    views: 310,
    saves: 2,
    items: [
      {
        id: 1,
        title: "test",
        preview_image: "https://www.veggieprezi.com/wp-content/uploads/2017/09/20170731_214129.jpg",
        ranking: 2,
        created_at: 1,
        updated_at: 2,
      },
    ],
  }
  ngOnInit(): void {
  }

}
