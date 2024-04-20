import { Injectable } from '@angular/core';
import { LocationGatewayPort } from '../../domain/port/output/location-gateway-port';
import { LocationModel } from '../../domain/model/location-model';
import { ExternalApiLocationService } from './external-api-location.service';

@Injectable({
  providedIn: 'root'
})
export class LocationGatewayAdapterService extends LocationGatewayPort {

  constructor(private externalApiLocationService: ExternalApiLocationService) { super() }

  override createLocation(location: LocationModel): Promise<LocationModel | undefined> {

    return this.externalApiLocationService.createLocation(location);

  }
  override updateLocation(locationId: string, location: LocationModel): Promise<LocationModel | undefined> {

    return this.externalApiLocationService.updateLocation(locationId, location);

  }
  override deleteLocation(locationId: string): Promise<void> {

    return this.externalApiLocationService.deleteLocation(locationId);


  }
  override getLocation(locationId: string): Promise<LocationModel | undefined> {

    return this.externalApiLocationService.getLocation(locationId);

  }


  override getAllLocation(): Promise<LocationModel[] | undefined> {

    return this.externalApiLocationService.getAllLocations();

  }


}
