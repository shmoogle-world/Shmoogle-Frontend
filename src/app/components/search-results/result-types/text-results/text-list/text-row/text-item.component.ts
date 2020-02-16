import { Component, Input, OnInit } from '@angular/core';
import { TextResult } from '../../../../models/text-result.model';

@Component({
  selector: 'app-text-row',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.css']
})
export class TextItemComponent implements OnInit {

    @Input() data: TextResult;

    constructor() { }

    ngOnInit() {
    }

}
