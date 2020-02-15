import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SearchResultService } from '../search-result.service';
import { SearchResults } from '../search-results.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-text-results',
  templateUrl: './text-results.component.html',
  styleUrls: ['./text-results.component.css']
})
export class TextResultsComponent implements OnInit, OnDestroy {
    
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
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
