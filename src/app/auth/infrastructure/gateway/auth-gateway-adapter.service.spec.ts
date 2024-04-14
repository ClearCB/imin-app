import { TestBed } from '@angular/core/testing';

import { AuthGatewayAdapterService } from './auth-gateway-adapter.service';

describe('AuthGatewayAdapterService', () => {
  let service: AuthGatewayAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGatewayAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
