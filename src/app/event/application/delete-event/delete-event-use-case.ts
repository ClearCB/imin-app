import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";

export async function deleteEvent(eventGateway: EventGatewayPort, eventId: string): Promise<void> {

    await eventGateway.deleteEvent(eventId);

}