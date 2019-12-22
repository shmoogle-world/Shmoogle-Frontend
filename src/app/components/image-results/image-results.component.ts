import {
    Component,
} from "@angular/core";
import { ResultComponent } from "../result/result.component";

@Component({
    selector: 'app-image-results',
    templateUrl: './image-results.component.html',
    styleUrls: ['./image-results.component.css']
})
export class ImageResultsComponent extends ResultComponent {
    public endpointPath: string = "search/images/";
}
