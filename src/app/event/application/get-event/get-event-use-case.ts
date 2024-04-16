import { EventModel } from "../../domain/model/event-model";
import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";

export async function getEvent(eventGateway: EventGatewayPort, eventId: string): Promise<EventModel | undefined> {

    return await eventGateway.getEvent(eventId);

}