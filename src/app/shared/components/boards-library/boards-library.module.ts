import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsLibraryComponent } from './boards-library.component'
import { MatGridListModule } from '@angular/material/grid-list';
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
        RouterModule.forChild(
            routes,
        ),
    ]
})
export class BoardsLibraryModule { }
