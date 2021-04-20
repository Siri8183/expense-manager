import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-dialog-result',
  templateUrl: './dialog-result.component.html',
  styleUrls: ['./dialog-result.component.scss']
})
export class DialogResultComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<DialogResultComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
