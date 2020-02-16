import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
    { path: 'search', loadChildren: './components/search-results/search-results.module#SearchResultsModule'},
    { path: '**', component: LandingComponent, pathMatch: 'full' },
    // { path: 'search', component: SearchResultComponent },
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
        appRoutes,
        // { enableTracing: true}//, useHash: true  }
        // <-- debugging purposes only
      ),
  ],
  exports: [ RouterModule ]
})



export class RouteModule { }