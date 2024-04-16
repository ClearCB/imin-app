import { TestBed } from '@angular/core/testing';

import { ExternalApiEventService } from './external-api-event.service';

describe('ExternalApiEventService', () => {
  let service: ExternalApiEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalApiEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
