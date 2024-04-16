import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EventModel } from '../../domain/model/event-model';
import { EVENT_CONSTANTS } from '../../event-constants';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiEventService {

  constructor(private httpClient: HttpClient) {
  }

  createEvent(event: EventModel): Promise<EventModel | undefined> {

    const body = JSON.stringify(event);
    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.CREATE_EVENT}`;

    return lastValueFrom(this.httpClient.post<EventModel>(url, body));

  };

  updateEvent(eventId: string, event: EventModel): Promise<EventModel | undefined> {

    const body = JSON.stringify(event);
    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.UPDATE_EVENT}/${eventId}`;

    return lastValueFrom(this.httpClient.put<EventModel>(url, body));

  };
  deleteEvent(eventId: string): Promise<void> {

    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.DELETE_EVENT_BY_ID}/${eventId}`;

    return lastValueFrom(this.httpClient.delete<void>(url));

  };
  getEvent(eventId: string): Promise<EventModel | undefined> {

    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.GET_EVENT_BY_ID}/${eventId}`;

    return lastValueFrom(this.httpClient.get<EventModel>(url));

  };

  getAllEvents(): Promise<EventModel[] | undefined> {

    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.GET_ALL_EVENTS}`;

    return lastValueFrom(this.httpClient.get<EventModel[]>(url));

  };
}
