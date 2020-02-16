import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule, Routes } from '@angular/router';
import { ResultCounterComponent } from './result-counter/result-counter.component';
import { ImageResultsComponent } from './result-types/image-results/image-results.component';
import { TextListComponent } from './result-types/text-results/text-list/text-list.component';
import { TextItemComponent } from './result-types/text-results/text-list/text-row/text-item.component';
import { TextResultsComponent } from './result-types/text-results/text-results.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultComponent } from './search-result.component';
import { SearchResultService } from './search-result.service';



const featureRoutes: Routes = [
    { path: '', 
        component:  SearchResultComponent, 
        children: [
            { path: '', component: TextResultsComponent },
            { path: 'images', component: ImageResultsComponent }
        ] 
    },
    { path: 'images/results', component:  ImageResultsComponent },
]

@NgModule({
    declarations: [
        SearchResultComponent,
        ImageResultsComponent,
        TextResultsComponent,
        TextListComponent,
        TextItemComponent,
        SearchBarComponent,
        ResultCounterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSlideToggleModule,
        MatIconModule,
        RouterModule.forChild(featureRoutes),
    ],
    providers: [
        SearchResultService,
    ]
})
export class SearchResultsModule {

}