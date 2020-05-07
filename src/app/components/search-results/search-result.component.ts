import { AfterViewInit, Component, ContentChild, ElementRef, HostListener } from "@angular/core";

@Component({
  selector: "app-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"],

})
export class SearchResultComponent implements AfterViewInit {


  @ContentChild("stickyMenu") menuElement: ElementRef;

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
}
