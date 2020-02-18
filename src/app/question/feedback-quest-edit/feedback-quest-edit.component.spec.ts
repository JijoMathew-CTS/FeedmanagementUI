import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestEditComponent } from './feedback-quest-edit.component';

describe('FeedbackQuestEditComponent', () => {
  let component: FeedbackQuestEditComponent;
  let fixture: ComponentFixture<FeedbackQuestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackQuestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackQuestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
