import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberExpensesComponent } from './member-expenses.component';

describe('MemberExpensesComponent', () => {
  let component: MemberExpensesComponent;
  let fixture: ComponentFixture<MemberExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
