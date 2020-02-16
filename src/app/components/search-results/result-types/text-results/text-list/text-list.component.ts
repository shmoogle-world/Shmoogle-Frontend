import { Component, OnInit, Input } from '@angular/core';
import { TextResult } from '../../../models/text-result.model';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css']
})
export class TextListComponent implements OnInit {

    @Input() data: TextResult[];

    constructor() { }

    ngOnInit() {
    }

}
