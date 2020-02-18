import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchResults } from '../../search-results.model';
import { SearchResultService } from '../../search-result.service';

@Component({
  selector: 'app-web-results',
  templateUrl: './web-results.component.html',
  styleUrls: ['./web-results.component.css']
})
export class WebResultsComponent implements OnInit, OnDestroy {
    
    public requestPending: boolean;
    private pendingSubscription: Subscription;

    public results: SearchResults;
    public isMobile: boolean = false;
    public showShuffled: boolean = true;
    private showShuffledSubscription: Subscription;
    private subscription: Subscription;

    constructor(private sRService: SearchResultService) { }

    ngOnInit() {
        this.subscription = this.sRService.resultsChanged.subscribe(results => {
            this.results = results;
        });
        

        this.pendingSubscription = this.sRService.requestPendingChanged.subscribe(pending => {
            this.requestPending = pending;
        });

        this.toggle();
        this.isMobile = this.sRService.isMobile;

        this.showShuffledSubscription = this.sRService.showShuffled
        .subscribe((event: boolean) => {
            this.showShuffled = event;
        });
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
        this.showShuffledSubscription.unsubscribe();
    }

}
