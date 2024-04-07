export interface UpdateEventUseCase {
    create(eventId: number, event: Event): Event;
}
