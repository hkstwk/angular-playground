import { TestBed } from '@angular/core/testing';

import { EulerService } from './euler.service';

describe('EulerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EulerService = TestBed.get(EulerService);
    expect(service).toBeTruthy();
  });
});
