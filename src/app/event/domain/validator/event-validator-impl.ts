import { EventMessageEnum } from "../constants/event-messages";
import { Event } from "../model/event";
import { EventValidator } from "./event-validator";

export class EventValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EventValidationError';
    }
}

export class EventValidatorImpl implements EventValidator {
    constructor() { }

    public validate(event: Event): void {
        if (!event) {
            throw new EventValidationError(EventMessageEnum.EVENT_CANT_BE_NULL);
        }
        this.validateTitle(event);
    }

    private validateTitle(event: Event): void {
        if (!event.title || event.title.trim().length === 0) {
            throw new EventValidationError(EventMessageEnum.EVENT_TITLE_CANT_BE_NULL);
        }
    }
}
