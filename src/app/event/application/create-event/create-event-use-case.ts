import { ensureEventIsValid, EventModel } from "../../domain/model/event-model";
import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";

export async function createEvent(eventGateway: EventGatewayPort, event: EventModel): Promise<EventModel | undefined> {

    ensureEventIsValid(event);
    return await eventGateway.createEvent(event);

}