import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 

import { SearchResultComponent } from './search-result.component';
import { ImageResultsComponent } from './image-results/image-results.component';
import { TextResultsComponent } from './text-results/text-results.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

import { SearchResultService } from './search-result.service';
import { TextItemComponent } from './text-results/text-list/text-row/text-item.component';
import { TextListComponent } from './text-results/text-list/text-list.component';

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
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSlideToggleModule,
        RouterModule.forChild(featureRoutes),
    ],
    providers: [
        SearchResultService,
    ]
})
export class SearchResultsModule {

}