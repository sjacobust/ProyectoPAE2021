import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyMenuComponent } from './monthly-menu.component';

describe('MonthlyMenuComponent', () => {
  let component: MonthlyMenuComponent;
  let fixture: ComponentFixture<MonthlyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
