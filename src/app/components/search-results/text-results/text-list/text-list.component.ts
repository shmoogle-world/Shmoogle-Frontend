import { Component, OnInit, Input } from '@angular/core';
import { textItem } from './text-item.type';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css']
})
export class TextListComponent implements OnInit {

    @Input() data: textItem[];

    constructor() { }

    ngOnInit() {
    }

}
