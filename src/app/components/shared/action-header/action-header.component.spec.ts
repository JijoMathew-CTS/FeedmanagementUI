import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionHeaderComponent } from './action-header.component';

describe('ActionHeaderComponent', () => {
  let component: ActionHeaderComponent;
  let fixture: ComponentFixture<ActionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
