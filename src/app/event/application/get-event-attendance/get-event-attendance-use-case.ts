import { EventGatewayPort } from "../../domain/port/output/event-gateway-port";

export async function getEventAttendance(eventGateway: EventGatewayPort, eventId: string): Promise<any[] | undefined> {

    return await eventGateway.getEventAttendance(eventId);

}