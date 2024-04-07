import { EventModel } from "../../model/event-model";

export interface UpdateEventUseCase {
    create(eventId: number, event: EventModel): EventModel;
}
