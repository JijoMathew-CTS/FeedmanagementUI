import { TestBed } from '@angular/core/testing';

import { PmoService } from './pmo.service';

describe('PmoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PmoService = TestBed.get(PmoService);
    expect(service).toBeTruthy();
  });
});
