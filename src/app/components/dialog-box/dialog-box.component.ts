import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { UsersData } from '../home/home.component';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit { 

  ngOnInit(): void {
  }
  action:string;
  local_data:any;
  error ='';

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) { 
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    if(!!this.local_data.name){
      this.dialogRef.close({event:this.action,data:this.local_data});
    }else{
      this.error ='Please enter the name';
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
