import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../../../search-result.model';

@Component({
  selector: 'app-text-row',
  templateUrl: './text-item.component.html',
  styleUrls: ['./text-item.component.css']
})
export class TextItemComponent implements OnInit {

    @Input() data: SearchResult;

    constructor() { }

    ngOnInit() {
    }

}
