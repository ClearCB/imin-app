import { TestBed } from '@angular/core/testing';

import { EventGatewayAdapterService } from './event-gateway-adapter.service';

describe('EventGatewayAdapterService', () => {
  let service: EventGatewayAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventGatewayAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
