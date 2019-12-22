import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    ViewChild,
    ElementRef,
    HostListener
} from "@angular/core";
import { ImageModel } from '../../Models/imagesModel';
import { HttpClient } from "@angular/common/http";
import { GoogleAnalyticsEventsService } from "../../Services/analytics/analytic-sercice/analytic-sercice.component";
import { Router } from "@angular/router";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { ErrorDialogBoxComponent } from "../error-dialog-box/error-dialog-box.component";
import { ResultComponent } from "../result/result.component";

import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from '../../Services/globals.service';

@Component({
    selector: 'app-image-results',
    templateUrl: './image-results.component.html',
    styleUrls: ['./image-results.component.css']
})
export class ImageResultsComponent extends ResultComponent {
    public endpointPath: string = "search/images/";
}
