import { Category } from "../../../shared/domain/model/category";
import { Tag } from "../../../shared/domain/model/tag";
import { EVENT_CONSTANTS } from "../../event-constants";

export interface EventModel {

    id: string;
    title: string;
    userId: string;
    smallDescription: string;
    largeDescription: string;
    locationName: string;
    latitude: number;
    longitude: number;
    startDate: Date;
    finishDate: Date;
    categories: Category[];
    tags?: Tag[];
    isOnline: boolean;

}

export function ensureEventIsValid(event: EventModel): void {

    if (!isValidModelTitle(event.title)) {
        throw EventTitleNotValidError(event.title);
    }

    if (!isValidModelDate(event)) {
        throw EventDateNotValidError();
    }

    if (!isValidModelLocation(event.locationName)) {
        throw EventLocationNotValidError();
    }

}

export function isValidModelTitle(title: string): boolean {
    return title != null && title != undefined && title != '';
}

export function EventTitleNotValidError(title: string): Error {
    return new Error(`${EVENT_CONSTANTS.MESSAGES.EVENT_CANT_BE_NULL}: ${title}`)
}

export function isValidModelDate(event: EventModel): boolean {
    return event.startDate <= event.finishDate;
}

export function EventDateNotValidError(): Error {
    return new Error(`${EVENT_CONSTANTS.MESSAGES.EVENT_DATE_INVALID}`)
}

export function isValidModelLocation(eventLocation: string): boolean {
    return eventLocation != null && eventLocation != undefined && eventLocation != '';
}

export function EventLocationNotValidError(): Error {
    return new Error(`${EVENT_CONSTANTS.MESSAGES.EVENT_LOCATION_CANT_BE_NULL}`)
}
