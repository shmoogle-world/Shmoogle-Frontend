import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleBoardComponent } from './single-board/single-board.component';
import { SingleBoardModule } from './single-board/single-board.module';

const routes: Routes = [
  { path: ':boardid/view', component: SingleBoardComponent }
]

@NgModule({
  imports: [
    SingleBoardModule,
    RouterModule.forChild(
      routes,
    ),
  ],
})
export class BoardsModule { }
