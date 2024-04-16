import { Injectable } from '@angular/core';
import { EventGatewayPort } from '../../domain/port/output/event-gateway-port';
import { EVENT_CONSTANTS } from '../../event-constants';
import { createEvent } from '../../application/create-event/create-event-use-case';
import { EventModel } from '../../domain/model/event-model';
import { NotificationService } from '../../../shared/infrastructure/service/notification.service';
import { updateEvent } from '../../application/update-event/update-event-use-case';
import { getEvent } from '../../application/get-event/get-event-use-case';
import { deleteEvent } from '../../application/delete-event/delete-event-use-case';
import { getAllEvent } from '../../application/get-all-event/get-all-event-use-case';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(
    private notificationService: NotificationService,
    private eventGatewayPort: EventGatewayPort,
  ) { }


  async createEvent(event: EventModel): Promise<EventModel | undefined> {
    try {

      const eventCreated = await createEvent(this.eventGatewayPort, event);

      if (!eventCreated) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CREATE_KO);
        return;
      }

      this.notificationService.showSuccess(EVENT_CONSTANTS.MESSAGES.EVENT_CREATE_OK);
      return eventCreated;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CREATE_KO);
      return;
    }

  }

  async updateEvent(eventId: string, event: EventModel): Promise<EventModel | undefined> {

    try {

      const eventUpdated = await updateEvent(this.eventGatewayPort, eventId, event);

      if (!eventUpdated) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_UPDATE_KO);
        return;
      }

      this.notificationService.showSuccess(EVENT_CONSTANTS.MESSAGES.EVENT_UPDATE_OK);
      return eventUpdated;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_UPDATE_KO);
      return;
    }

  }

  async deleteEvent(eventId: string): Promise<void> {

    try {

      await deleteEvent(this.eventGatewayPort, eventId);
      this.notificationService.showSuccess(EVENT_CONSTANTS.MESSAGES.EVENT_DELETE_OK);

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_DELETE_KO);
    }

  }

  async getEvent(eventId: string): Promise<EventModel | undefined> {

    try {

      const event = await getEvent(this.eventGatewayPort, eventId);

      if (!event) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CREATE_KO);
        return;
      }

      this.notificationService.showSuccess(EVENT_CONSTANTS.MESSAGES.EVENT_CREATE_OK);
      return event;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CREATE_KO);
      return;
    }
  }

  async getAllEvent(): Promise<EventModel[] | undefined> {

    try {

      const events = await getAllEvent(this.eventGatewayPort);

      if (!events) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CREATE_KO);
        return;
      }

      return events;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CREATE_KO);
      return;
    }
  }

}
