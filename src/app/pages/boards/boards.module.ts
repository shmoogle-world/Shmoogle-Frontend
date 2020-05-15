import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { BoardHeaderComponent } from './single-board/board-header/board-header.component';
import { SingleBoardComponent } from './single-board/single-board.component';
import { BoardItemComponent } from './single-board/board-item/board-item.component';
import { MatIconModule } from '@angular/material/icon';

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
    RouterModule.forChild(
      routes,
    ),
  ],
})
export class BoardsModule { }
