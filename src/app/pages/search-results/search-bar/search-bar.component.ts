import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchResultService } from '../search-result.service';
import { filter } from 'rxjs/operators';

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
        this.showShuffleSlider = this.sRService.isMobile && this.router.url.split('?')[0] == '/search';
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe((newRoute: NavigationStart) => {
                this.showShuffleSlider = this.sRService.isMobile && newRoute.url.split('?')[0] == '/search';
            })

        this.route.queryParams.subscribe(params => {

            const query = params['q'];
            this.sRService.searchQuery = query;
            this.searchText = query;
            if (query == undefined) {
                this.router.navigateByUrl("/");
            }
        });

        this.searchText = this.sRService.searchQuery;

        this.pendingSubscription = this.sRService.requestPendingChanged.subscribe(pending => {
            this.requestPending = pending;
        });


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
        try {
            (document.activeElement as HTMLElement).blur();
        } catch (err) {
            console.log(err);
        }
        this.sRService.requestSearch(this.searchText);
    }
    public onShuffleToggled(event) {
        this.sRService.onShuffleToggle(event.checked);
    }
}
