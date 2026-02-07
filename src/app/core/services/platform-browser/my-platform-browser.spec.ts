import { TestBed } from '@angular/core/testing';

import { MyPlatformBrowser } from './my-platform-browser';

describe('MyPlatformBrowser', () => {
  let service: MyPlatformBrowser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPlatformBrowser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
