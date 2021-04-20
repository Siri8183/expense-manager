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
    var d = new Date();

    // this.dataSource.push({
    //   id: d.getTime(),
    //   name: row_obj.name,
    //   totalAmount: 0,
    // });
    const newMember = {
      memberId: d.getTime(),
      name: row_obj.name,
      totalAmount: 0,
    };

    this.memberService.addMember(newMember).subscribe((data) => {
      this.dataSource = data;
      console.log(data);
    });
    // this.table.renderRows();
  }

  updateMember(row_obj) {
    const member = {
      memberId: row_obj.memberId,
      name: row_obj.name,
    };
    this.memberService.updateMember(member).subscribe((data) => {
      this.dataSource = data;
    });
    // this.dataSource = this.dataSource.filter((value, key) => {
    //   if (value.id == row_obj.id) {
    //     value.name = row_obj.name;
    //     value.totalAmount = row_obj.totalAmount;
    //   }
    //   return true;
    // });
  }

  deleteMember(row_obj) {
    this.memberService.deleteMember(row_obj.memberId).subscribe((data) => {
      this.dataSource = data;
    });

    // this.dataSource = this.dataSource.filter((value, key) => {
    //   return value.id != row_obj.id;
    // });
  }

  calculateExpenses() {
    this.memberService.calculateExpenses().subscribe((data: []) => {
      console.log(data);
      if (!!data) {
        this.expensesResult = data;
 
        const dialogRef = this.dialog.open(DialogResultComponent, {
          width: '300px',
          height: '300px',
          data: data,
        });
    
        // dialogRef.afterClosed().subscribe((result) => {
        //   if (result) {
        //     if (result.event == 'Add') {
        //       this.addMember(result.data);
        //     } else if (result.event == 'Update') {
        //       this.updateMember(result.data);
        //     } else if (result.event == 'Delete') {
        //       this.deleteMember(result.data);
        //     }
        //   }
        // });
      }
    });
  }

  navigateTo(e) {
    localStorage.setItem('memberData', JSON.stringify(e));
    this.router.navigate(['memberExpenses']);
  }
}
