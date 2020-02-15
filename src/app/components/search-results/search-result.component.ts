import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    HostListener
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-result",
    templateUrl: "./search-result.component.html",
    styleUrls: ["./search-result.component.css"],

})
export class SearchResultComponent implements OnInit {

    //#region Constructor & Lifecycle Hooks
    constructor(
        public router: Router,
    ) { }

    ngOnInit() { }


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
