import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    HostListener
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { SearchResultService } from './search-result.service';

@Component({
    selector: "app-result",
    templateUrl: "./search-result.component.html",
    styleUrls: ["./search-result.component.css"],

})
export class SearchResultComponent implements OnInit {

    public requestPending: boolean;

    private pendingSubscription: Subscription;

    constructor(
        public router: Router,
        private sRService: SearchResultService
    ) { }

    ngOnInit() { 
        this.pendingSubscription = this.sRService.requestPendingChanged.subscribe(pending => {
            this.requestPending = pending;
        });
        this.requestPending = this.sRService.requestPending;
    }


    //#endregion

    //#region Sticky Nav

    @ViewChild("stickyMenu") menuElement: ElementRef;

    sticky: boolean = false;
    elementPosition: any;

    ngAfterViewInit() {
        this.elementPosition = this.menuElement.nativeElement.offsetTop;
    }

    @HostListener("window:scroll", ["$event"])
    handleScroll() {
        const windowScroll = window.pageYOffset;
        if (windowScroll >= this.elementPosition + 120) {
            this.sticky = true;
        } else {
            this.sticky = false;
        }
    }

    //#endregion

    //#region private methods

    

    
    //#endregion
}
