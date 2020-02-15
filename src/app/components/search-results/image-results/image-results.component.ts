import {
    Component, Input,OnInit
} from "@angular/core";
import { SearchResultComponent } from "../search-result.component";

@Component({
    selector: 'app-image-results',
    templateUrl: './image-results.component.html',
    styleUrls: ['./image-results.component.css']
})
export class ImageResultsComponent implements OnInit {
    @Input() data: string;
    constructor() { }

    ngOnInit() {
    }
}
