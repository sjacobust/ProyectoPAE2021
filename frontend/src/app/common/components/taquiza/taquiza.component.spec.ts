import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaquizaComponent } from './taquiza.component';

describe('TaquizaComponent', () => {
  let component: TaquizaComponent;
  let fixture: ComponentFixture<TaquizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaquizaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaquizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
