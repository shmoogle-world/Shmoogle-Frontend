import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { SingleBoardComponent } from './single-board/single-board.component';
import { SingleBoardModule } from './single-board/single-board.module';
import { BoardsLibraryComponent } from './boards-library/boards-library.component';
import { BoardsLibraryModule } from './boards-library/boards-library.module';

const routes: Routes = [
  { path: ':boardid/view', component: SingleBoardComponent },
  { path: 'library', component: BoardsLibraryComponent }
]

@NgModule({
  imports: [
    BoardsLibraryModule,
    SingleBoardModule,
    RouterModule.forChild(
      routes,
    ),
  ],
})
export class BoardsModule { }
