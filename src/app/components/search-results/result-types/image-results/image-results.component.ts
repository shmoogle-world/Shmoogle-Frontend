import {
    Component, 
    Input,
    OnInit
} from "@angular/core";
import { SearchResults } from '../../search-results.model';
import { Subscription } from 'rxjs';
import { SearchResultService } from '../../search-result.service';

@Component({
    selector: 'app-image-results',
    templateUrl: './image-results.component.html',
    styleUrls: ['./image-results.component.css']
})
export class ImageResultsComponent implements OnInit {
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
            endpointPath: 'search/images/',
            type: 'img',
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.pendingSubscription.unsubscribe();
    }
}
