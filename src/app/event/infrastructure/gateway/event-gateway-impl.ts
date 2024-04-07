import { EventModel } from "../../domain/model/event-model";
import { EventGateway } from "../../domain/port/output/event-gateway";

export class EventGatewayImpl implements EventGateway {

    private events: EventModel[];

    constructor() {
        this.events = [];
    }

    createEvent(event: EventModel): EventModel | undefined {
        const eventFound = this.events.find(e => e.id === event.id);

        if (eventFound) {
            return eventFound;
        }

        this.events.push(event);
        return event;
    }

    updateEvent(eventId: number, updatedEvent: EventModel): EventModel | undefined {
        const index = this.events.findIndex(e => e.id === eventId);

        if (index !== -1) {
            this.events[index] = { ...updatedEvent, id: eventId };
            return this.events[index];
        }

        return undefined;
    }

    deleteEvent(eventId: number): void {
        const index = this.events.findIndex(e => e.id === eventId);

        if (index !== -1) {
            this.events.splice(index, 1);
        }
    }

    getEvent(eventId: number): EventModel | undefined {
        return this.events.find(e => e.id === eventId);
    }
}
