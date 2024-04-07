import { EventModel } from "../../model/event-model";

export interface GetEventUseCase {
    create(eventId: number): EventModel;
}
