import { Component, Input, OnInit } from '@angular/core';
import { WebResult } from '../../../../models/web-result.model';

@Component({
  selector: 'app-web-row',
  templateUrl: './web-item.component.html',
  styleUrls: ['./web-item.component.scss']
})
export class WebItemComponent implements OnInit {

    @Input() data: WebResult;

    constructor() { }

    ngOnInit() {
    }

}
