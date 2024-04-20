import { TestBed } from '@angular/core/testing';

import { LocationGatewayAdapterService } from './location-gateway-adapter.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LocationGatewayAdapterService', () => {
  let service: LocationGatewayAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(LocationGatewayAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
