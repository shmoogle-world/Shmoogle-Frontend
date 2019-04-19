import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-error-dialog-box',
  templateUrl: './error-dialog-box.component.html',
  styleUrls: ['./error-dialog-box.component.css']
})
export class ErrorDialogBoxComponent implements OnInit {

  //#region Public Members
  //#endregion

  //#region Constructor & lifeCycle Hooks
  constructor(public dialogRef: MatDialogRef<ErrorDialogBoxComponent>) { }

  ngOnInit() {
  }
  //#endregion

  //#region Public Methods
  /**
   * Closes the dialog box
   */
  public close(): void {
    this.dialogRef.close();
  }
  //#endregion
}
