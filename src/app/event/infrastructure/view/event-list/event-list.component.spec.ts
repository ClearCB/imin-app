import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListComponent } from './event-list.component';
import { NotificationService } from '../../../../shared/infrastructure/service/notification.service';
import { MessageService } from 'primeng/api';
import { EventGatewayPort } from '../../../domain/port/output/event-gateway-port';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListComponent],
      providers: [NotificationService, MessageService, EventGatewayPort]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
