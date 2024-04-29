import { EventModel } from "../../domain/model/event-model";
import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";
import { SearchEventOptions } from "./search-event-options";

export async function searchEvent(eventGateway: EventGatewayPort, searchOptions: SearchEventOptions): Promise<EventModel[] | undefined> {

    return await eventGateway.searchEvent(searchOptions);

}