import { TestBed } from '@angular/core/testing';

import { AcquiredService } from './acquired.service';

describe('AcquiredService', () => {
  let service: AcquiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcquiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
