import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ExternalApiService } from '../../../auth/infrastructure/gateway/external-api.service';

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
