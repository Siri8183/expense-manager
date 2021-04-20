import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  basePath='http://localhost:8081/'

  constructor(private http: HttpClient) { }

  getExpensesByMemberId(memberId:number){
    return this.http.get(this.basePath+'allExpensesByMemberId?memberId='+memberId);
  }

  addExpense(body:Object){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.basePath+'addExpense',body, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  updateExpense(body:Object){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put(this.basePath+'updateExpense',body, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  deleteExpense(params:any){  
    return this.http.delete(this.basePath+'deleteExpense?memberId='+params.memberId+'&expenseId='+params.expenseId).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) { 
    let err = "Something went wrong,Please check "; 
    return throwError(error.message);
  } 
}
