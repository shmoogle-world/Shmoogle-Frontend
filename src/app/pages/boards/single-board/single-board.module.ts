import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { SingleBoardService } from './single-board.service';
import { SingleBoardComponent } from './single-board.component';



@NgModule({
  declarations: [SingleBoardComponent, BoardHeaderComponent, BoardItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [
    SingleBoardService,
  ]
})
export class SingleBoardModule { }
