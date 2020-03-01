import { TestBed } from '@angular/core/testing';

import { EventDetailService } from './event-detail.service';

describe('EventDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventDetailService = TestBed.get(EventDetailService);
    expect(service).toBeTruthy();
  });
});
