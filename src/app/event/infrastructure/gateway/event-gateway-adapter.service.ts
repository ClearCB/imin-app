import { Injectable } from '@angular/core';
import { EventGatewayPort } from '../../domain/port/output/event-gateway-port';
import { EventModel } from '../../domain/model/event-model';
import { ExternalApiEventService } from './external-api-event.service';

@Injectable({
  providedIn: 'root'
})
export class EventGatewayAdapterService extends EventGatewayPort {

  constructor(private externalApiEventService: ExternalApiEventService) { super() }

  override createEvent(event: EventModel): Promise<EventModel | undefined> {

    return this.externalApiEventService.createEvent(event);

  }
  override updateEvent(eventId: string, event: EventModel): Promise<EventModel | undefined> {

    return this.externalApiEventService.updateEvent(eventId, event);

  }
  override deleteEvent(eventId: string): Promise<void> {

    return this.externalApiEventService.deleteEvent(eventId);


  }
  override getEvent(eventId: string): Promise<EventModel | undefined> {

    return this.externalApiEventService.getEvent(eventId);

  }


  override getAllEvent(): Promise<EventModel[] | undefined> {

    return this.externalApiEventService.getAllEvents();

  }


}
