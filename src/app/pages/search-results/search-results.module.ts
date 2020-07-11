import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { ResultCounterComponent } from './result-counter/result-counter.component';
import { ImageResultsComponent } from './result-types/image-results/image-results.component';
import { WebItemComponent } from './result-types/web-results/web-list/web-item/web-item.component';
import { WebListComponent } from './result-types/web-results/web-list/web-list.component';
import { WebResultsComponent } from './result-types/web-results/web-results.component';
import { SearchResultComponent } from './search-result.component';
import { MatSelectModule } from '@angular/material/select';

const featureRoutes: Routes = [
  {
    path: '',
    component: SearchResultComponent,
    children: [
      { path: '', component: WebResultsComponent },
      { path: 'images', component: ImageResultsComponent }
    ]
  },
  { path: 'images/results', component: ImageResultsComponent },
]

@NgModule({
  declarations: [
    SearchResultComponent,
    ImageResultsComponent,
    WebItemComponent,
    WebListComponent,
    WebResultsComponent,
    ResultCounterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    RouterModule.forChild(featureRoutes),
  ],
  
})
export class SearchResultsModule {

}