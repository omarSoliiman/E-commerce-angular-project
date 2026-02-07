import { TestBed } from '@angular/core/testing';
import { CheckOut } from './check-out';


describe('Orders', () => {
  let service: CheckOut;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckOut);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
