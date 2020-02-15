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

    public results: SearchResults = new SearchResults();
    private subscription: Subscription;

    constructor(private sRService: SearchResultService) { }

    ngOnInit() {
        this.subscription = this.sRService.resultsChanged.subscribe(results => {
            this.results = results;
        });
        this.results = this.sRService.searchResults;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
