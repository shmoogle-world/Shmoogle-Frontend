import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
    { path: 'search', loadChildren: () => import('./components/search-results/search-results.module').then(m => m.SearchResultsModule)},
    { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)},
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
