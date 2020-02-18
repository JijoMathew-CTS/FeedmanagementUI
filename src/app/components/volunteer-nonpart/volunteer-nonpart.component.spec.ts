import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerNonpartComponent } from './volunteer-nonpart.component';

describe('VolunteerNonpartComponent', () => {
  let component: VolunteerNonpartComponent;
  let fixture: ComponentFixture<VolunteerNonpartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerNonpartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerNonpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
