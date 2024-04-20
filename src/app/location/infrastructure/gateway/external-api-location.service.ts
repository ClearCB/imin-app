import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LocationModel } from '../../domain/model/location-model';
import { LOCATION_CONSTANTS } from '../../location-constants';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiLocationService {

  constructor(private httpClient: HttpClient) {
  }

  createLocation(location: LocationModel): Promise<LocationModel | undefined> {

    const body = JSON.stringify(location);
    const url = `${LOCATION_CONSTANTS.API.BASE_URL}${LOCATION_CONSTANTS.API.ENDPOINTS.CREATE_LOCATION}`;

    return lastValueFrom(this.httpClient.post<LocationModel>(url, body));

  };

  updateLocation(locationId: string, location: LocationModel): Promise<LocationModel | undefined> {

    const body = JSON.stringify(location);
    const url = `${LOCATION_CONSTANTS.API.BASE_URL}${LOCATION_CONSTANTS.API.ENDPOINTS.UPDATE_LOCATION}/${locationId}`;

    return lastValueFrom(this.httpClient.put<LocationModel>(url, body));

  };
  deleteLocation(locationId: string): Promise<void> {

    const url = `${LOCATION_CONSTANTS.API.BASE_URL}${LOCATION_CONSTANTS.API.ENDPOINTS.DELETE_LOCATION_BY_ID}/${locationId}`;

    return lastValueFrom(this.httpClient.delete<void>(url));

  };
  getLocation(locationId: string): Promise<LocationModel | undefined> {

    const url = `${LOCATION_CONSTANTS.API.BASE_URL}${LOCATION_CONSTANTS.API.ENDPOINTS.GET_LOCATION_BY_ID}/${locationId}`;

    return lastValueFrom(this.httpClient.get<LocationModel>(url));

  };

  getAllLocations(): Promise<LocationModel[] | undefined> {

    const url = `${LOCATION_CONSTANTS.API.BASE_URL}${LOCATION_CONSTANTS.API.ENDPOINTS.GET_ALL_LOCATIONS}`;

    return lastValueFrom(this.httpClient.get<LocationModel[]>(url));

  };
}
