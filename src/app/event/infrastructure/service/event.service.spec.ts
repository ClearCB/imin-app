import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../../shared/infrastructure/service/notification.service';
import { EventGatewayPort } from '../../domain/port/output/event-gateway-port';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, EventGatewayPort, NotificationService] // Provide MessageService here,

    });
    service = TestBed.inject(EventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
