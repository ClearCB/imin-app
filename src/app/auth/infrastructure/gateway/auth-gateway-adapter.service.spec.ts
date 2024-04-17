import { TestBed } from '@angular/core/testing';

import { AuthGatewayAdapterService } from './auth-gateway-adapter.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AuthGatewayAdapterService', () => {
  let service: AuthGatewayAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(AuthGatewayAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
