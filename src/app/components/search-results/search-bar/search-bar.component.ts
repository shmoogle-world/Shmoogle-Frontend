import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchResultService } from '../search-result.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
    
    public searchText: string = '';
    public requestPending: boolean;

    private pendingSubscription: Subscription;
    public showShuffleSlider: boolean = false;
    public imagesSearch: boolean = false;
    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private sRService: SearchResultService) { }

    public ngOnInit() {
        this.sRService.isMobile = this.checkIsMobile();
        this.route.queryParams.subscribe(params => {
            const query = params['q'];
            this.sRService.searchText = query;
            this.searchText = query;
            if (this.sRService.searchText == undefined) {
                this.router.navigateByUrl("/");
            }
        });
        this.searchText = this.sRService.searchText;

        this.pendingSubscription = this.sRService.requestPendingChanged.subscribe(pending => {
            this.requestPending = pending;
        });
        this.requestPending = this.sRService.requestPending;

    }
    ngOnDestroy() {
        this.pendingSubscription.unsubscribe();
    }

    public async toggle() {
        let response = { 
            value: this.imagesSearch, 
            endpointPath: '', 
            type: '', 
            text: this.searchText 
        };
        if (this.imagesSearch) {
            response.endpointPath = 'search/images/';
            response.type = 'img';
        } else {
            response.endpointPath = 'search/';
            response.type = 'text';
        }

        this.sRService.toggleType(response);
    }

    public search() {
        this.sRService.onSearch(this.searchText);    
    }
    public onShuffleToggled(event) {
        this.sRService.onShuffleToggle(event.checked);
    }

    /**
     * detects if we are in mobile view or not
     */
    private checkIsMobile() {
        if (window.innerWidth <= 540) {
            return true;
        } else {
            return false;
        }
    }
}
