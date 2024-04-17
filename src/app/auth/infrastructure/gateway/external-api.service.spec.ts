import { TestBed } from '@angular/core/testing';

import { ExternalApiService } from './external-api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ExternalApiService', () => {
  let service: ExternalApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(ExternalApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
