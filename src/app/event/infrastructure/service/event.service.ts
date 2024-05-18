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
import { SearchEventOptions } from '../../application/search-event/search-event-options';
import { searchEvent } from '../../application/search-event/search-event-use-case';
import { UserData } from '../../../auth/domain/model/user-token-data';
import { addUserToEvent } from '../../application/add-user-to-event/attend-event-use-case';
import { getEventAttendance } from '../../application/get-event-attendance/get-event-attendance-use-case';
import { getUserAttendance } from '../../application/get-user-attendance/get-user-attendance-use-case';
import { User } from '../../../auth/domain/model/user';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventDetailComponent } from '../view/event-detail/event-detail.component';
import { SHARED_CONSTANTS } from '../../../shared/shared-constants';
import { Router } from '@angular/router';
import { getUsersEvents } from '../../application/get-users-events/get-users-events-use-case';
import { EventMapperService } from '../mapper/event-mapper.service';
import { AuthService } from '../../../auth/infrastructure/service/auth.service';
import { removeUserFromEvent } from '../../application/remove-user-to-event/remove-event-use-case';

@Injectable({
  providedIn: 'root',
})
export class EventService {

  ref: DynamicDialogRef | undefined;

  constructor(
    private notificationService: NotificationService,
    private eventGatewayPort: EventGatewayPort,
    private dialogService: DialogService,
    private router: Router,
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
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_NOT_FOUND);
        return;
      }

      return event;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_NOT_FOUND);
      return;
    }
  }

  async getAllEvent(): Promise<EventModel[] | undefined> {

    try {

      const events = await getAllEvent(this.eventGatewayPort);

      if (!events) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_NOT_FOUND);
        return;
      }

      return events;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_NOT_FOUND);
      return;
    }
  }

  async searchEvents(searchOptions: SearchEventOptions): Promise<EventModel[] | undefined> {

    try {

      const events = await searchEvent(this.eventGatewayPort, searchOptions);

      if (!events) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_NOT_FOUND);
        return;
      }

      return events;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_NOT_FOUND);
      return;
    }
  }

  async addUserToEvent(event: EventModel, userData: UserData): Promise<boolean | undefined> {

    try {

      const userAddedToEvent = await addUserToEvent(this.eventGatewayPort, event, userData);

      if (!userAddedToEvent) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CANT_ADD_USER);
        return;
      }
      
      this.notificationService.showSuccess(EVENT_CONSTANTS.MESSAGES.EVENT_ADDED_USER);
      return userAddedToEvent;
      
    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CANT_ADD_USER);
      return;
    }
  }

  async removeUserFromEvent(event: EventModel, userData: UserData): Promise<boolean | undefined> {

    try {

      const userRemovedFromEvent = await removeUserFromEvent(this.eventGatewayPort, event, userData);
      this.notificationService.showSuccess(EVENT_CONSTANTS.MESSAGES.EVENT_REMOVED_USER);
      return userRemovedFromEvent;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_CANT_REMOVE_USER);
      return;
    }
  }

  async getEventAttendance(event: EventModel): Promise<User[] | undefined> {

    try {

      const eventAttendance = await getEventAttendance(this.eventGatewayPort, event.id);

      if (!eventAttendance) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_ATTENDANCE_ERROR);
        return;
      }

      return eventAttendance;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.EVENT_ATTENDANCE_ERROR);
      return;
    }
  }


  async getUserAttendance(userData: UserData): Promise<EventModel[] | undefined> {

    try {
      const userAddedToEvent = await getUserAttendance(this.eventGatewayPort, userData.id);

      if (!userAddedToEvent) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.USER_ATTENDANCE_ERROR);
        return;
      }

      return userAddedToEvent.map(e => EventMapperService.toDomain(e));

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.USER_ATTENDANCE_ERROR);
      return;
    }
  }

  async getUsersEvents(userData: UserData): Promise<EventModel[] | undefined> {

    try {
      const userAddedToEvent = await getUsersEvents(this.eventGatewayPort, userData.id);

      if (!userAddedToEvent) {
        this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.USERS_EVENT_ERROR);
        return;
      }

      return userAddedToEvent;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(EVENT_CONSTANTS.MESSAGES.USERS_EVENT_ERROR);
      return;
    }
  }

  public opentEventDetail(event:EventModel){

    this.ref = this.dialogService.open(EventDetailComponent, {
      data: event,
      header: 'Event detail',
      width: '85vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      baseZIndex: 10000,
      maximizable: true
    });

  }

  
  public goToEventDetail(event:EventModel){

    this.router.navigateByUrl(`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${event.id}`);

  }

  public goToEventEditForm(event:EventModel){

    this.router.navigateByUrl(`/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.UPDATE}/${event.id}`);

  }

}