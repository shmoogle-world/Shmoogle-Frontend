import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
    @Output() public onSearch: EventEmitter<any> = new EventEmitter();
    @Input() public searchText: string = '';
    @Input() public loadingAnimation: boolean;
    constructor(public navservice: Router,) { }

    public ngOnInit() {
    }
    public search() {
        this.onSearch.emit(this.searchText);
    }
}
