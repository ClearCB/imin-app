import { LocationModel } from "../../model/location-model";

export abstract class LocationGatewayPort {
    abstract createLocation(location: LocationModel): Promise<LocationModel | undefined>;
    abstract updateLocation(locationId: string, location: LocationModel): Promise<LocationModel | undefined>;
    abstract deleteLocation(locationId: string): Promise<void>;
    abstract getLocation(locationId: string): Promise<LocationModel | undefined>;
    abstract getAllLocation(): Promise<LocationModel[] | undefined>;
}
