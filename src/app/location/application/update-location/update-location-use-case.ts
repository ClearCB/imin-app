import { ensureLocationIsValid, LocationModel } from "../../domain/model/location-model";
import { LocationGatewayPort } from "../../domain/port/output/location-gateway-port";

export async function updateLocation(locationGateway: LocationGatewayPort, locationId: string, location: LocationModel): Promise<LocationModel | undefined> {

    ensureLocationIsValid(location);
    return await locationGateway.updateLocation(locationId, location);

}