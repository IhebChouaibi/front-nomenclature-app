import { TestBed } from '@angular/core/testing';

import { Vallidation } from './vallidation';

describe('Vallidation', () => {
  let service: Vallidation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vallidation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
