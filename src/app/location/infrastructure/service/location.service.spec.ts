import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../../shared/infrastructure/service/notification.service';
import { LocationGatewayPort } from '../../domain/port/output/location-gateway-port';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, LocationGatewayPort, NotificationService] // Provide MessageService here,

    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
