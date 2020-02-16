import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../../../search-result.model';

@Component({
  selector: 'app-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css']
})
export class TextListComponent implements OnInit {

    @Input() data: SearchResult[];

    constructor() { }

    ngOnInit() {
    }

}
