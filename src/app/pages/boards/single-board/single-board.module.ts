import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../shared/shared.module';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { SingleBoardComponent } from './single-board.component';
import { SingleBoardService } from './single-board.service';

@NgModule({
  declarations: [SingleBoardComponent, BoardHeaderComponent, BoardItemComponent],
  imports: [

    MatButtonModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    DragDropModule,
    MatCardModule,
  ],
  providers: [
    SingleBoardService,
  ]
})
export class SingleBoardModule { }
