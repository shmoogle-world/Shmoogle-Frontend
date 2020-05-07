import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'search', loadChildren: () => import('./pages/search-results/search-results.module').then(m => m.SearchResultsModule)},
    { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)},
    { path: '**', component: HomeComponent, pathMatch: 'full' },
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
