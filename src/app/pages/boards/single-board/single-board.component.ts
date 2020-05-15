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
    created_at: new Date(),
    updated_at: new Date(),
    views: 310,
    saves: 15,
    items: [
      {
        id: 1,
        title: "test",
        preview_image: "https://www.veggieprezi.com/wp-content/uploads/2017/09/20170731_214129.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: "not potato",
        preview_image: "https://www.veggieprezi.com/wp-content/uploads/2017/09/20170731_214129.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  }
  ngOnInit(): void {
  }

}
