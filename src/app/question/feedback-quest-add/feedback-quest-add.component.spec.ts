import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestAddComponent } from './feedback-quest-add.component';

describe('FeedbackQuestAddComponent', () => {
  let component: FeedbackQuestAddComponent;
  let fixture: ComponentFixture<FeedbackQuestAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackQuestAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackQuestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
