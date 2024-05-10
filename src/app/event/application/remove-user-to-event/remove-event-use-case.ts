import { UserData } from "../../../auth/domain/model/user-token-data";
import { EventModel } from "../../domain/model/event-model";
import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";

export async function removeUserFromEvent(eventGateway: EventGatewayPort, event: EventModel, userData: UserData): Promise<boolean | undefined> {

    return await eventGateway.removeUserFromEvent(event, userData);

}