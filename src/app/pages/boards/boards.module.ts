import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { BoardHeaderComponent } from './single-board/board-header/board-header.component';
import { BoardItemComponent } from './single-board/board-item/board-item.component';
import { SingleBoardComponent } from './single-board/single-board.component';

const routes: Routes = [
  { path: 'view', component: SingleBoardComponent }
]

@NgModule({
  declarations: [SingleBoardComponent, BoardHeaderComponent, BoardItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forChild(
      routes,
    ),
  ],
})
export class BoardsModule { }
