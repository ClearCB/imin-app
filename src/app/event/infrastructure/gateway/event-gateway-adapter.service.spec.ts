import { TestBed } from '@angular/core/testing';

import { EventGatewayAdapterService } from './event-gateway-adapter.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('EventGatewayAdapterService', () => {
  let service: EventGatewayAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(EventGatewayAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
