import { Injectable } from '@angular/core';
import { EventGatewayPort } from '../../domain/port/output/event-gateway-port';
import { EventModel } from '../../domain/model/event-model';
import { ExternalApiEventService } from './external-api-event.service';
import { SearchCriteria } from '../../../shared/domain/model/search-criteria';
import { SearchEventOptions } from '../../application/search-event/search-event-options';
import { UserData } from '../../../auth/domain/model/user-token-data';
import { EventMapperService } from '../mapper/event-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class EventGatewayAdapterService extends EventGatewayPort {

  constructor(private externalApiEventService: ExternalApiEventService) { super() }

  override async createEvent(event: EventModel): Promise<EventModel | undefined> {

    const res = await this.externalApiEventService.createEvent(event)

    if (!res || !res.data) {
      return;
    }
    return EventMapperService.toDomain(res.data)

  }

  override async updateEvent(eventId: string, event: EventModel): Promise<EventModel | undefined> {

    const res = await this.externalApiEventService.updateEvent(eventId, event);

    if (!res || !res.data) {
      return;
    }

    return EventMapperService.toDomain(res.data)

  }

  override deleteEvent(eventId: string): Promise<void> {

    return this.externalApiEventService.deleteEvent(eventId);

  }

  override async getEvent(eventId: string): Promise<EventModel | undefined> {

    const res = await this.externalApiEventService.getEvent(eventId);

    if (!res || !res.data) {
      return;
    }

    return EventMapperService.toDomain(res.data)
  }

  override async getAllEvent(): Promise<EventModel[] | undefined> {

    const res = await this.externalApiEventService.getAllEvents();

    if (!res || !res.data) {
      return;
    }

    return res.data.map((e:EventModel) => EventMapperService.toDomain(e));

  }

  override async searchEvent(searchOptions: SearchEventOptions): Promise<EventModel[] | undefined> {

    const res = await this.externalApiEventService.searchEvent(searchOptions);

    if (!res || !res.data) {
      return;
    }

    return res.data.map((e:EventModel) => EventMapperService.toDomain(e));

  }

  override async addUserToEvent(event: EventModel, userData: UserData): Promise<boolean | undefined> {

    const res = await this.externalApiEventService.addUserToEvent(event.id, userData.id);

    if (!res || !res.data) {
      return false;
    }

    return true;
  }

  
  override async removeUserFromEvent(event: EventModel, userData: UserData): Promise<boolean | undefined> {

    const res = await this.externalApiEventService.removeUserFromEvent(event.id, userData.id);

    if (!res) {
      return false;
    }

    return true;
  }
  
  override async getEventAttendance(eventId:string): Promise<any[] | undefined> {

    const res = await this.externalApiEventService.getEventAttendance(eventId);

    if (!res || !res.data) {
      return [];
    }

    return res.data;
  }

  
  override async getUserAttendance(userId: string): Promise<EventModel[] | undefined> {

    const res = await this.externalApiEventService.getUserAttendance(userId);

    if (!res || !res.data) {
      return [];
    }

    return res.data.map((e:EventModel) => EventMapperService.toDomain(e));
  }
  override async getUsersEvents(userId: string): Promise<EventModel[] | undefined> {

    const res = await this.externalApiEventService.getUsersEvents(userId);

    if (!res || !res.data) {
      return [];
    }

    return res.data.map((e:EventModel) => EventMapperService.toDomain(e));
  }
}
