import { Category } from "../../../shared/domain/model/category";
import { Tag } from "../../../shared/domain/model/tag";
import { EVENT_CONSTANTS } from "../../event-constants";

export interface  EventModel {

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

}

export function isValidModelTitle(title: string): boolean {
    return title != null && title != undefined && title != '';
}

export function EventTitleNotValidError(title: string): Error {
    return new Error(`${EVENT_CONSTANTS.MESSAGES.EVENT_CANT_BE_NULL}: ${title}`)
}
