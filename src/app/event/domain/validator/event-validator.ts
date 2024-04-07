import { Event } from "../model/event";

export interface EventValidator {
    validate(Event: Event): void;
}
