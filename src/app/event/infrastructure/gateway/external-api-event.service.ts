import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { EventModel } from '../../domain/model/event-model';
import { EVENT_CONSTANTS } from '../../event-constants';
import { EventMapperService } from '../mapper/event-mapper.service';
import { ApiResponse } from '../../../shared/domain/model/api-response';
import { SearchCriteria } from '../../../shared/domain/model/search-criteria';
import { SearchEventOptions } from '../../application/search-event/search-event-options';
import { UserData } from '../../../auth/domain/model/user-token-data';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiEventService {

  constructor(private httpClient: HttpClient) {
  }

  createEvent(event: EventModel): Promise<ApiResponse | undefined> {

    const eventDto = EventMapperService.toGateway(event);

    const body = JSON.stringify(eventDto);
    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.CREATE_EVENT}`;

    return lastValueFrom(this.httpClient.post<ApiResponse>(url, body));

  };

  updateEvent(eventId: string, event: EventModel): Promise<ApiResponse | undefined> {

    const eventDto = EventMapperService.toGateway(event);

    const body = JSON.stringify(eventDto);
    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.UPDATE_EVENT}/${eventId}`;

    return lastValueFrom(this.httpClient.put<ApiResponse>(url, body));

  };
  deleteEvent(eventId: string): Promise<void> {

    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.DELETE_EVENT_BY_ID}/${eventId}`;

    return lastValueFrom(this.httpClient.delete<void>(url));

  };
  getEvent(eventId: string): Promise<ApiResponse | undefined> {

    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.GET_EVENT_BY_ID}/${eventId}`;

    return lastValueFrom(this.httpClient.get<ApiResponse>(url));

  };

  getAllEvents(): Promise<ApiResponse | undefined> {

    const url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.GET_ALL_EVENTS}`;

    return lastValueFrom(this.httpClient.get<ApiResponse>(url));

  };

  searchEvent(searchOptions: SearchEventOptions): Promise<ApiResponse | undefined> {

    let url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.SEARCH_EVENT}`;

    if (searchOptions.pageNumber != null && searchOptions.pageSize != null) {
      url = `${url}?pageSize=${searchOptions.pageSize}&pageNum=${searchOptions.pageNumber}`
    }

    return lastValueFrom(this.httpClient.post<ApiResponse>(url, JSON.stringify(searchOptions.body)));
  };

  addUserToEvent(eventId: string, userId: string): Promise<ApiResponse | undefined> {


    let url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.ADD_USER}`;
    const body = JSON.stringify({ eventId: eventId, userId: userId });

    return lastValueFrom(this.httpClient.post<ApiResponse>(url, JSON.stringify(body)));
  };

  removeUserFromEvent(eventId: string, userId: string): Promise<ApiResponse | undefined> {

    let url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.REMOVE_USER}`;
    const body = JSON.stringify({ eventId: eventId, userId: userId });

    return lastValueFrom(this.httpClient.post<ApiResponse>(url, JSON.stringify(body)));
  };


  getEventAttendance(eventId:string): Promise<ApiResponse | undefined> {

    let url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.EVENT_ATTENDANCE}${eventId}`;

    return lastValueFrom(this.httpClient.get<ApiResponse>(url));
  };

  getUserAttendance(userId: string): Promise<ApiResponse | undefined> {

    let url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.USER_ATTENDANCE}${userId}`;

    return lastValueFrom(this.httpClient.get<ApiResponse>(url));

  };

  getUsersEvents(userId: string): Promise<ApiResponse | undefined> {

    let url = `${EVENT_CONSTANTS.API.BASE_URL}${EVENT_CONSTANTS.API.ENDPOINTS.USERS_EVENTS}${userId}`;

    return lastValueFrom(this.httpClient.get<ApiResponse>(url));

  };

}
