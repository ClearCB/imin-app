import { EventModel } from "../../domain/model/event-model";
import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";

export async function getAllCategories(eventGateway: ): Promise<EventModel[] | undefined> {

    return await eventGateway.getAllEvent();

}