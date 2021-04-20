import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UsersData } from '../home/home.component';

@Component({
  selector: 'app-dialog-expenses',
  templateUrl: './dialog-expenses.component.html',
  styleUrls: ['./dialog-expenses.component.scss'],
})
export class DialogExpensesComponent implements OnInit {
  ngOnInit(): void {}
  action: string;
  local_data: any;
  nameError = '';
  amountError = '';

  constructor(
    public dialogRef: MatDialogRef<DialogExpensesComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData
  ) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction() {
    if (this.local_data.amount && this.local_data.expense) {
      // amount should be a number with 2 or less decimals
      // if(this.local_data.amount.split('.')[1].length>2){
      const regex = /^\d+(\.\d{1,2})?$/;
      if (!regex.test(this.local_data.amount)) {
        this.amountError = 'Amount should be a number with atmost 2 decimals';
      } else {
        this.dialogRef.close({ event: this.action, data: this.local_data });
      }
      // this.dialogRef.close({event:this.action,data:this.local_data});
    } else {
      if (
        this.local_data.expense == '' ||
        this.local_data.expense == undefined
      ) {
        this.nameError = 'Please enter the Expense Name';
      }
      if (this.local_data.amount == '' || this.local_data.amount == undefined) {
        this.amountError = 'Please enter the amount';
      }
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  onAmountChange() {
    const regex = '/^[0-9].*[0-9]{2}/';
    if (!this.local_data.amount.test(regex)) {
      this.amountError = 'Amount should be a number with atmost 2 decimals';
    }
  }
}
