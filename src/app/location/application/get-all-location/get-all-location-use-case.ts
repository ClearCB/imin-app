import { LocationModel } from "../../domain/model/location-model";
import { LocationGatewayPort } from "../../domain/port/output/location-gateway-port";

export async function getAllLocation(locationGateway: LocationGatewayPort): Promise<LocationModel[] | undefined> {

    return await locationGateway.getAllLocation();

}