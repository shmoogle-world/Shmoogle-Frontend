import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
  constructor() { }

  ngOnInit(): void {
  }
  
  get public(): boolean {
    return this.boardForm.get('public').value;
  }

  onSubmit() {

  }

}
