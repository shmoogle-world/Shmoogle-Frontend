import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-results',
  templateUrl: './text-results.component.html',
  styleUrls: ['./text-results.component.css']
})
export class TextResultsComponent implements OnInit {
    @Input() data: string;
    constructor() { }

    ngOnInit() {
    }

}
