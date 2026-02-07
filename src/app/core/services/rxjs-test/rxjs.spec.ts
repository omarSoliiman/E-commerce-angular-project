import { TestBed } from '@angular/core/testing';

import { Rxjs } from './rxjs';

describe('Rxjs', () => {
  let service: Rxjs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rxjs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
