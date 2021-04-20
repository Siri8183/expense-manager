import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  basePath='http://localhost:8081/'

  constructor(private http: HttpClient) { }

  getAllMembers(){
    return this.http.get(this.basePath+'getAllMembers');
  }

  addMember(body:Object){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post(this.basePath+'addMember',body, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  updateMember(body:Object){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.put(this.basePath+'updateMember',body, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  deleteMember(memberId:number){  
    return this.http.delete(this.basePath+'deleteMember?memberId='+memberId).pipe(
      catchError(this.handleError)
    );
  }

  calculateExpenses(){
    return this.http.get(this.basePath+'calculateExpenses');
  }
  
  private handleError(error: HttpErrorResponse) { 
    let err = "Something went wrong,Please check "; 
    return throwError(error.message);
  }
}
