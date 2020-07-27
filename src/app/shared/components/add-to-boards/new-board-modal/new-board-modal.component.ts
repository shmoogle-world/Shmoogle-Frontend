import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WebResult } from '../../../../pages/search-results/models/web-result.model';
import { ImageResult } from '../../../../pages/search-results/models/image-result.model';

@Component({
  selector: 'app-new-board-modal',
  templateUrl: './new-board-modal.component.html',
  styleUrls: ['./new-board-modal.component.scss']
})
export class NewBoardModalComponent implements OnInit {
  
  boardForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.minLength(6)]),
    public: new FormControl(true, [Validators.required])
  });
  
  pending = true;

  constructor(
    public dialogRef: MatDialogRef<NewBoardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public searchResult: WebResult | ImageResult
    ) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.dialogRef.close(true);
  }

}
  