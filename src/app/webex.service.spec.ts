import { TestBed } from '@angular/core/testing';

import { WebexService } from './webex.service';

describe('WebexService', () => {
  let service: WebexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
