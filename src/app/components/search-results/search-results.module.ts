import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule, Routes } from '@angular/router';
import { LoaderComponent } from './../../loader/loader.component';
import { SharedModule } from './../../shared/shared.module';
import { ResultCounterComponent } from './result-counter/result-counter.component';
import { ImageResultsComponent } from './result-types/image-results/image-results.component';
import { WebItemComponent } from './result-types/web-results/web-list/web-item/web-item.component';
import { WebListComponent } from './result-types/web-results/web-list/web-list.component';
import { WebResultsComponent } from './result-types/web-results/web-results.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResultComponent } from './search-result.component';
import { SearchResultService } from './search-result.service';

const featureRoutes: Routes = [
    { path: '', 
        component:  SearchResultComponent, 
        children: [
            { path: '', component: WebResultsComponent },
            { path: 'images', component: ImageResultsComponent }
        ] 
    },
    { path: 'images/results', component:  ImageResultsComponent },
]

@NgModule({
    declarations: [
        SearchResultComponent,
        ImageResultsComponent,
        WebItemComponent,
        WebListComponent,
        WebResultsComponent,
        SearchBarComponent,
        ResultCounterComponent,
        LoaderComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
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