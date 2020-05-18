import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'search', loadChildren: () => import('./pages/search-results/search-results.module').then(m => m.SearchResultsModule)},
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)},
  { path: '**', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
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
