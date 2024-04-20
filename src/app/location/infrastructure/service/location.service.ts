import { Injectable } from '@angular/core';
import { LocationGatewayPort } from '../../domain/port/output/location-gateway-port';
import { LOCATION_CONSTANTS } from '../../location-constants';
import { createLocation } from '../../application/create-location/create-location-use-case';
import { LocationModel } from '../../domain/model/location-model';
import { NotificationService } from '../../../shared/infrastructure/service/notification.service';
import { updateLocation } from '../../application/update-location/update-location-use-case';
import { getLocation } from '../../application/get-location/get-location-use-case';
import { deleteLocation } from '../../application/delete-location/delete-location-use-case';
import { getAllLocation } from '../../application/get-all-location/get-all-location-use-case';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(
    private notificationService: NotificationService,
    private locationGatewayPort: LocationGatewayPort,
  ) { }


  async createLocation(location: LocationModel): Promise<LocationModel | undefined> {
    try {

      const locationCreated = await createLocation(this.locationGatewayPort, location);

      if (!locationCreated) {
        this.notificationService.showError(LOCATION_CONSTANTS.MESSAGES.LOCATION_CREATE_KO);
        return;
      }

      this.notificationService.showSuccess(LOCATION_CONSTANTS.MESSAGES.LOCATION_CREATE_OK);
      return locationCreated;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(LOCATION_CONSTANTS.MESSAGES.LOCATION_CREATE_KO);
      return;
    }

  }

  async updateLocation(locationId: string, location: LocationModel): Promise<LocationModel | undefined> {

    try {

      const locationUpdated = await updateLocation(this.locationGatewayPort, locationId, location);

      if (!locationUpdated) {
        this.notificationService.showError(LOCATION_CONSTANTS.MESSAGES.LOCATION_UPDATE_KO);
        return;
      }

      this.notificationService.showSuccess(LOCATION_CONSTANTS.MESSAGES.LOCATION_UPDATE_OK);
      return locationUpdated;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(LOCATION_CONSTANTS.MESSAGES.LOCATION_UPDATE_KO);
      return;
    }

  }

  async deleteLocation(locationId: string): Promise<void> {

    try {

      await deleteLocation(this.locationGatewayPort, locationId);
      this.notificationService.showSuccess(LOCATION_CONSTANTS.MESSAGES.LOCATION_DELETE_OK);

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(LOCATION_CONSTANTS.MESSAGES.LOCATION_DELETE_KO);
    }

  }

  async getLocation(locationId: string): Promise<LocationModel | undefined> {

    try {

      const location = await getLocation(this.locationGatewayPort, locationId);

      if (!location) {
        this.notificationService.showError(LOCATION_CONSTANTS.MESSAGES.LOCATION_CREATE_KO);
        return;
      }

      this.notificationService.showSuccess(LOCATION_CONSTANTS.MESSAGES.LOCATION_CREATE_OK);
      return location;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(LOCATION_CONSTANTS.MESSAGES.LOCATION_CREATE_KO);
      return;
    }
  }

  async getAllLocation(): Promise<LocationModel[] | undefined> {

    try {

      const locations = await getAllLocation(this.locationGatewayPort);

      if (!locations) {
        this.notificationService.showError(LOCATION_CONSTANTS.MESSAGES.LOCATION_CREATE_KO);
        return;
      }

      return locations;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(LOCATION_CONSTANTS.MESSAGES.LOCATION_CREATE_KO);
      return;
    }
  }

}
