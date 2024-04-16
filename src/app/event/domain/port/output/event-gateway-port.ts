import { EventModel } from "../../model/event-model";

export abstract class EventGatewayPort {
    abstract createEvent(event: EventModel): Promise<EventModel | undefined>;
    abstract updateEvent(eventId: string, event: EventModel): Promise<EventModel | undefined>;
    abstract deleteEvent(eventId: string): Promise<void>;
    abstract getEvent(eventId: string): Promise<EventModel | undefined>;
    abstract getAllEvent(): Promise<EventModel[] | undefined>;
}
