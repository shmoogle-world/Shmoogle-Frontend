import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

const appRoutes: Routes = [
  { path: 'search', loadChildren: () => import('./pages/search-results/search-results.module').then(m => m.SearchResultsModule)},
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule)},
  { path: 'boards', loadChildren: () => import('./pages/boards/boards.module').then(m => m.BoardsModule)},
  { path: '**', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
        appRoutes,
        routingConfiguration
        // { enableTracing: true}//, useHash: true  }
        // <-- debugging purposes only
      ),
  ],
  exports: [ RouterModule ]
})



export class RouteModule { }
