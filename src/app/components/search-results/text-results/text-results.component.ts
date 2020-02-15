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
    
    public results: SearchResults = new SearchResults();
    public isMobile: boolean = false;
    public showShuffled: boolean = false;
    private subscription: Subscription;

    constructor(private sRService: SearchResultService) { }

    ngOnInit() {
        this.subscription = this.sRService.resultsChanged.subscribe(results => {
            console.log("this happens, text result is made");
            this.results = results;
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
