import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './components/home/home.component';
import { MemberExpensesComponent } from './components/member-expenses/member-expenses.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [ 
{
  path: 'home',
  component: HomeComponent 
},
{ path: 'memberExpenses', component: MemberExpensesComponent, pathMatch: 'full' },
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
