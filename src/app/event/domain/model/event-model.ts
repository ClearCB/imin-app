import { Category } from "../../../shared/domain/model/category";
import { Tag } from "../../../shared/domain/model/tag";
import { EVENT_CONSTANTS } from "../../event-constants";

export interface EventModel {

    id: string;
    title: string;
    smallDescription: string;
    largeDescription: string;
    locationName: string;
    latitude: number;
    longitude: number;
    startDate: boolean;
    finishDate: boolean;
    categories: Category[];
    tags: Tag[];
    mainImageId: string;
    isOnline: boolean;
    isActive: boolean;

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
