import { Component, OnInit, Input } from '@angular/core';
import { textItem } from '../text-item.type';

@Component({
  selector: 'app-text-row',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.css']
})
export class TextItemComponent implements OnInit {

    @Input() data: textItem;

    constructor() { }

    ngOnInit() {
    }

}
