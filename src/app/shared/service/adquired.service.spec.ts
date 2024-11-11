import { TestBed } from '@angular/core/testing';

import { AdquiredService } from './adquired.service';

describe('AdquiredService', () => {
  let service: AdquiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdquiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
