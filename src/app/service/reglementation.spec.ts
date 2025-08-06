import { TestBed } from '@angular/core/testing';

import { Reglementation } from './reglementation';

describe('Reglementation', () => {
  let service: Reglementation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reglementation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
