import { EventModel } from "../../model/event-model";

export interface EventGateway {
    createEvent(event: EventModel): EventModel | undefined;
    updateEvent(eventId: number, event: EventModel): EventModel | undefined;
    deleteEvent(eventId: number): void;
    getEvent(eventId: number): EventModel | undefined;
}
