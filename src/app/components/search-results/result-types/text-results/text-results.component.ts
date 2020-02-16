import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchResults } from '../../search-results.model';
import { SearchResultService } from '../../search-result.service';

@Component({
  selector: 'app-text-results',
  templateUrl: './text-results.component.html',
  styleUrls: ['./text-results.component.css']
})
export class TextResultsComponent implements OnInit, OnDestroy {
    public requestPending: boolean;
    private pendingSubscription: Subscription;

    public results: SearchResults;
    public isMobile: boolean = false;
    public showShuffled: boolean = true;
    private subscription: Subscription;

    constructor(private sRService: SearchResultService) { }

    ngOnInit() {
        this.subscription = this.sRService.resultsChanged.subscribe(results => {
            this.results = results;
        });
        this.results = this.sRService.searchResults;

        this.pendingSubscription = this.sRService.requestPendingChanged.subscribe(pending => {
            this.requestPending = pending;
        });
        this.requestPending = this.sRService.requestPending;
        this.toggle();
    }

    public toggle() {
        this.sRService.toggleType({    
            endpointPath: 'search/', 
            type: 'text',  
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.pendingSubscription.unsubscribe();
    }

}
