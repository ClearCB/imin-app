import { LocationGatewayPort } from "../../domain/port/output/location-gateway-port";

export async function deleteLocation(locationGateway: LocationGatewayPort, locationId: string): Promise<void> {

    await locationGateway.deleteLocation(locationId);

}