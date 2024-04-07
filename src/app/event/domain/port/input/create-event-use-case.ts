import { EventModel } from "../../model/event-model";

export interface CreateEventUseCase {
    create(event: EventModel): EventModel;
}
