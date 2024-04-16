import { EVENT_CONSTANTS } from "../../event-constants";

export interface EventModel {

    id: string;
    title: string;
    smallDescription: string;
    largeDescription: string;

}

export function ensureEventIsValid(event: EventModel): void {

    if (!isValidModelTitle(event.title)) {
        throw EventTitleNotValidError(event.title);
    }

}

export function isValidModelTitle(title: string): boolean {
    return title != null && title != undefined && title != '';
}

export function EventTitleNotValidError(title: string): Error {
    return new Error(`${EVENT_CONSTANTS.MESSAGES.EVENT_CANT_BE_NULL}: ${title}`)
}
