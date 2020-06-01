import { Component, OnInit } from '@angular/core';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-boards-library',
  templateUrl: './boards-library.component.html',
  styleUrls: ['./boards-library.component.scss']
})
export class BoardsLibraryComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 4, rows: 1, color: 'lightblue' },
    // { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    // { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    // { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
