import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MembersService } from 'src/app/services/members.service';
import { DialogResultComponent } from '../dialog-result/dialog-result.component';

export interface UsersData {
  memberId: number;
  name: string;
  expense: string;
  totalAmount: number;
}

const ELEMENT_DATA: UsersData[] = [];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['name', 'totalAmount', 'action'];
  expensesResult = [];
  dataSource: any;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  ngOnInit(): void {
    this.memberService.getAllMembers().subscribe((data) => {
      this.dataSource = data;
    });
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private memberService: MembersService
  ) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      height: '300px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.event == 'Add') {
          this.addMember(result.data);
        } else if (result.event == 'Update') {
          this.updateMember(result.data);
        } else if (result.event == 'Delete') {
          this.deleteMember(result.data);
        }
      }
    });
  }

  addMember(row_obj) {
    const d = new Date();
 
    const newMember = {
      memberId: d.getTime(),
      name: row_obj.name,
      totalAmount: 0,
    };

    this.memberService.addMember(newMember).subscribe((data) => {
      this.dataSource = data; 
    }); 
  }

  updateMember(row_obj) {
    const member = {
      memberId: row_obj.memberId,
      name: row_obj.name,
    };
    this.memberService.updateMember(member).subscribe((data) => {
      this.dataSource = data;
    }); 
  }

  deleteMember(row_obj) {
    this.memberService.deleteMember(row_obj.memberId).subscribe((data) => {
      this.dataSource = data;
    }); 
  }

  calculateExpenses() { 
    
if(this.dataSource.length>0){
    this.memberService.calculateExpenses().subscribe((data: []) => { 
      if (!!data) {
        this.expensesResult = data;
 
        const dialogRef = this.dialog.open(DialogResultComponent, {
          width: '300px',
          height: '300px',
          data: data,
        }); 
      }
    });
  }
  }

  navigateTo(e) {
    localStorage.setItem('memberData', JSON.stringify(e));
    this.router.navigate(['memberExpenses']);
  }
}
