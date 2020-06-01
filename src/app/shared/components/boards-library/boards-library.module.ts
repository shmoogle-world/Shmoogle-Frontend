import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsLibraryComponent } from './boards-library.component'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';


const routes: Routes = [
    { path: '', component: BoardsLibraryComponent }
]

@NgModule({
    declarations: [
        BoardsLibraryComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatGridListModule,
        MatCardModule,
        ScrollingModule,
        RouterModule.forChild(
            routes,
        ),
    ]
})
export class BoardsLibraryModule { }
