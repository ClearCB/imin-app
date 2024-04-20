import { LocationModel } from "../../domain/model/location-model";
import { LocationGatewayPort } from "../../domain/port/output/location-gateway-port";

export async function getLocation(locationGateway: LocationGatewayPort, locationId: string): Promise<LocationModel | undefined> {

    return await locationGateway.getLocation(locationId);

}