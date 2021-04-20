import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExpensesComponent } from './dialog-expenses.component';

describe('DialogExpensesComponent', () => {
  let component: DialogExpensesComponent;
  let fixture: ComponentFixture<DialogExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
