import { LOCATION_CONSTANTS } from "../../location-constants";

export interface LocationModel {

    id: string;
    title: string;
    smallDescription: string;
    largeDescription: string;

}

export function ensureLocationIsValid(location: LocationModel): void {

    if (!isValidModelTitle(location.title)) {
        throw LocationTitleNotValidError(location.title);
    }

}

export function isValidModelTitle(title: string): boolean {
    return title != null && title != undefined && title != '';
}

export function LocationTitleNotValidError(title: string): Error {
    return new Error(`${LOCATION_CONSTANTS.MESSAGES.LOCATION_CANT_BE_NULL}: ${title}`)
}
