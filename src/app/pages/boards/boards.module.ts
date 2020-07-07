import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
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
