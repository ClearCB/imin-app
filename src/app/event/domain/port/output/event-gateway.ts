export interface EventGateway {
    createEvent(event: Event): Event;
    updateEvent(eventId: number, event: Event): Event;
    deleteEvent(eventId: number): void;
    getEvent(eventId: number): Event;
}
