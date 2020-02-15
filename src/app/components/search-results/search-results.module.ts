import { NgModule } from '@angular/core';

import { SearchResultComponent } from './search-result.component';
import { ImageResultsComponent } from './image-results/image-results.component';
import { TextResultsComponent } from './text-results/text-results.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 

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
        SearchBarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatSlideToggleModule,
        RouterModule.forChild(featureRoutes),
    ],
})
export class SearchResultsModule {

}