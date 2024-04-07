import { EventModel } from "../model/event-model";

export interface EventValidator {
    validate(Event: EventModel): void;
}
