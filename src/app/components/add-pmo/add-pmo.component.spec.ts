import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPmoComponent } from './add-pmo.component';

describe('AddPmoComponent', () => {
  let component: AddPmoComponent;
  let fixture: ComponentFixture<AddPmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPmoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
