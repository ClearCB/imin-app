import { TestBed } from '@angular/core/testing';

import { ExternalApiLocationService } from './external-api-location.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ExternalApiLocationService', () => {
  let service: ExternalApiLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(ExternalApiLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
