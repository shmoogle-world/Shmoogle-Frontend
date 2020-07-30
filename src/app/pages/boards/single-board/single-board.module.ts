import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BoardHeaderComponent } from './board-header/board-header.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { SingleBoardComponent } from './single-board.component';
import { SingleBoardService } from './single-board.service';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [SingleBoardComponent, BoardHeaderComponent, BoardItemComponent],
  imports: [

    MatButtonModule,
    FormsModule,
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
