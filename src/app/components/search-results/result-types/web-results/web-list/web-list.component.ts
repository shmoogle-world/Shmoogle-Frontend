import { Component, OnInit, Input } from '@angular/core';
import { WebResult } from '../../../models/web-result.model';

@Component({
  selector: 'app-web-list',
  templateUrl: './web-list.component.html',
  styleUrls: ['./web-list.component.css']
})
export class WebListComponent implements OnInit {

    @Input() data: WebResult[];

    constructor() { }

    ngOnInit() {
    }

}
