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
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { LandingComponent } from "../landing/landing.component";
import { decode } from '@angular/router/src/url_tree';
@Component({
  selector: 'app-image-results',
  templateUrl: './image-results.component.html',
  styleUrls: ['./image-results.component.css']
})
export class ImageResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
