import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerUnregComponent } from './volunteer-unreg.component';

describe('VolunteerUnregComponent', () => {
  let component: VolunteerUnregComponent;
  let fixture: ComponentFixture<VolunteerUnregComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerUnregComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerUnregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
