import { UserData } from "../../../auth/domain/model/user-token-data";
import { EventModel } from "../../domain/model/event-model";
import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";

export async function addUserToEvent(eventGateway: EventGatewayPort, event: EventModel, userData: UserData): Promise<boolean | undefined> {

    return await eventGateway.addUserToEvent(event, userData);

}