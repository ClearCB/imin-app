import { EventMessageEnum } from "../constants/event-messages";
import { EventModel } from "../model/event-model";
import { EventValidator } from "./event-validator";

export class EventValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EventValidationError';
    }
}

export class EventValidatorImpl implements EventValidator {
    constructor() { }

    public validate(event: EventModel): void {
        if (!event) {
            throw new EventValidationError(EventMessageEnum.EVENT_CANT_BE_NULL);
        }
        this.validateTitle(event);
    }

    private validateTitle(event: EventModel): void {
        if (!event.title || event.title.trim().length === 0) {
            throw new EventValidationError(EventMessageEnum.EVENT_TITLE_CANT_BE_NULL);
        }
    }
}
