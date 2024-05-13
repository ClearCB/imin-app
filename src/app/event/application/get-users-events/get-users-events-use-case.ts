import { EventModel } from "../../domain/model/event-model";
import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";

export async function getUsersEvents(eventGateway: EventGatewayPort, eventId: string): Promise<EventModel[] | undefined> {

    return await eventGateway.getUsersEvents(eventId);

}