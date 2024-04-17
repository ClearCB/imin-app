import { TestBed } from '@angular/core/testing';

import { ExternalApiEventService } from './external-api-event.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ExternalApiEventService', () => {
  let service: ExternalApiEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(ExternalApiEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
