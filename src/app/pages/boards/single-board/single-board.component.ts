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
    title: "Board Name",
    public: true,
    created_at: new Date(),
    view_count: 310,
    items: [
      {
        id: 1,
        title: "test",
        url: "https://www.veggieprezi.com/",
        snippet: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis enim non egestas luctus. Pellentesque metus magna, auctor eu euismod a, pulvinar id purus. Ut sit amet ante sit amet elit vehicula pulvinar in sed nulla. Suspendisse vestibulum lobortis neque ac porta. Curabitur eu tortor sit amet est porttitor auctor at sed ex.',
        preview_image: "https://www.veggieprezi.com/wp-content/uploads/2017/09/20170731_214129.jpg",
        dateLastCrawled: new Date(),
      },
      {
        id: 2,
        title: "not potato",
        url: "https://www.veggieprezi.com/",
        preview_image: "https://www.veggieprezi.com/wp-content/uploads/2017/09/20170731_214129.jpg",
        dateLastCrawled: new Date(),
      },
    ],
  }
  ngOnInit(): void {
  }

}
