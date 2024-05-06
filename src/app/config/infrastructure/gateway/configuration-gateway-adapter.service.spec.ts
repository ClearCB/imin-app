import { TestBed } from '@angular/core/testing';

import { ConfigurationGatewayAdapterService } from './configuration-gateway-adapter.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ConfigurationGatewayAdapterService', () => {
  let service: ConfigurationGatewayAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(ConfigurationGatewayAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
