import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/services/expense.service';
import { DialogExpensesComponent } from '../dialog-expenses/dialog-expenses.component';

export interface expenses {
  expenseId: number;
  memberId: number;
  expense: string;
  amount: number;
}
const ELEMENT_DATA: expenses[] = [];

@Component({
  selector: 'app-member-expenses',
  templateUrl: './member-expenses.component.html',
  styleUrls: ['./member-expenses.component.scss'],
})
export class MemberExpensesComponent implements OnInit {
  expenseId: number = 0;
  expenses: any;
  displayedColumns: string[] = ['expense', 'amount', 'action'];
  dataSource: any = ELEMENT_DATA;
  // memberData:any;
  // memberId:number;

  memberData = JSON.parse(localStorage.getItem('memberData'));
  memberId = this.memberData.memberId;

  ngOnInit(): void {
    console.log(this.memberId);
    if (!!this.memberId) {
      this.expenses = this.expenseService
        .getExpensesByMemberId(this.memberId)
        .subscribe((data) => {
          this.dataSource = data;
          let totalAmount = 0;

          if (!!this.dataSource) {
            totalAmount = this.dataSource
              .reduce((acc: number, exp) => parseFloat(exp.amount) + acc, 0)
              .toFixed(2);
          }
          console.log(totalAmount);
        });
    }
  }

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private expenseService: ExpenseService
  ) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogExpensesComponent, {
      width: '450px',
      height: '450px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.event == 'Add') {
          this.addExpense(result.data);
        } else if (result.event == 'Update') {
          this.updateExpense(result.data);
        } else if (result.event == 'Delete') {
          this.deleteExpense(result.data);
        }
      }
    });
  }

  addExpense(row_obj) {
    var d = new Date();
    let expense = {
      expenseId: d.getTime(),
      memberId: this.memberId,
      expense: row_obj.expense,
      amount: row_obj.amount,
    };

    this.expenseService.addExpense(expense).subscribe((data) => {
      this.dataSource = data;
    });

    // this.dataSource.push({
    //   expenseId:d.getTime(),
    //   memberId: this.memberId,
    //   expense:row_obj.expense,
    //   amount:row_obj.amount
    // });
    // this.table.renderRows();
  }

  updateExpense(row_obj) {
    const expense = {
      memberId: this.memberId,
      expenseId: row_obj.expenseId,
      expense: row_obj.expense,
      amount: row_obj.amount,
    };
    this.expenseService.updateExpense(expense).subscribe((data) => {
      this.dataSource = data;
    });

    // this.dataSource = this.dataSource.filter((value,key)=>{
    //   if(value.expenseId == row_obj.expenseId){
    //     value.expense = row_obj.expense;
    //     value.amount = row_obj.amount;
    //   }
    //   return true;
    // });
  }

  deleteExpense(row_obj) {
    const params = {
      expenseId: row_obj.expenseId,
      memberId: this.memberId,
    };

    this.expenseService.deleteExpense(params).subscribe((data) => {
      this.dataSource = data;
    });

    this.dataSource = this.dataSource.filter((value, key) => {
      return value.expenseId != row_obj.expenseId;
    });
  }
}
