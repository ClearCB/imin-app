import { EventModel } from "../../domain/model/event-model";
import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";

export async function getAllEvent(eventGateway: EventGatewayPort): Promise<EventModel[] | undefined> {

    return await eventGateway.getAllEvent();

}