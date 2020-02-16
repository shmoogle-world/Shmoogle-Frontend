import { Component, OnInit } from '@angular/core';
import { SearchResults } from '../search-results.model';
import { SearchResultService } from '../search-result.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result-counter',
  templateUrl: './result-counter.component.html',
  styleUrls: ['./result-counter.component.css']
})
export class ResultCounterComponent implements OnInit {
    public requestPending: boolean;
    private pendingSubscription: Subscription;
    
    public results: SearchResults = new SearchResults();
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
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.pendingSubscription.unsubscribe();
    }
}
