import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
    @Output() public onSearch: EventEmitter<any> = new EventEmitter();
    @Output() public onShuffleToggle: EventEmitter<any> = new EventEmitter();
    @Output() public toggleType: EventEmitter<any> = new EventEmitter();
    @Input() public searchText: string = '';
    @Input() public loadingAnimation: boolean;
    @Input() public showShuffleSlider: boolean = false;
    public imagesSearch: boolean = false;
    constructor(public navservice: Router, ) { }

    public ngOnInit() {
    }

    public async toggle() {
        let response = { value: this.imagesSearch, endpointPath: '', type: '', text: this.searchText };
        if (this.imagesSearch) {
            response.endpointPath = 'search/images/';
            response.type = 'img';
        } else {
            response.endpointPath = 'search/';
            response.type = 'text';
        }

        this.toggleType.emit(response);
    }

    public search() {
        this.onSearch.emit(this.searchText);    
    }
    public onShuffleToggled(event) {
        this.onShuffleToggle.emit(event.checked);
    }
}
