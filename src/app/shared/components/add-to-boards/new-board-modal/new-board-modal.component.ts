import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebResult } from '../../../../pages/search-results/models/web-result.model';
import { ImageResult } from '../../../../pages/search-results/models/image-result.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { BoardItem } from '../../../../pages/boards/board.model';
import { Board } from './../../../../pages/boards/board.model';

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board-modal.component.html',
  styleUrls: ['./new-board-modal.component.scss']
})
export class NewBoardModalComponent implements OnInit {
  
  boardForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.minLength(6)]),
    public: new FormControl(true, [Validators.required])
  });
  
  pending = false;

  constructor(
    public dialogRef: MatDialogRef<NewBoardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public searchResult: BoardItem,
    private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.pending = true;
    let payload: Board = {
      title: this.boardForm.get('title').value,
      description: this.boardForm.get('description').value,
      public: this.boardForm.get('public').value,
      item: this.searchResult,
    }; 
    this.http.post(`${environment.apiEndpoint}board/`, payload)
      .subscribe((response: any) => {
        console.log(response);
        this.pending = false
        this.dialogRef.close(true);
      })
    
  }

}
  