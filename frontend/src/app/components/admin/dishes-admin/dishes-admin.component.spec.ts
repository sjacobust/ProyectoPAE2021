import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesAdminComponent } from './dishes-admin.component';

describe('DishesAdminComponent', () => {
  let component: DishesAdminComponent;
  let fixture: ComponentFixture<DishesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
