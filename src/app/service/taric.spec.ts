import { TestBed } from '@angular/core/testing';

import { Taric } from './taric';

describe('Taric', () => {
  let service: Taric;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Taric);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
