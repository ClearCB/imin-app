import { LOCATION_CONSTANTS } from "../../location-constants";

export interface LocationModel {

    id: string;
    name: string;
    latitude: string;
    longitude: string;

}

export function ensureLocationIsValid(location: LocationModel): void {

    if (!isValidModelName(location.name)) {
        throw LocationNameNotValidError(location.name);
    }

}

export function isValidModelName(title: string): boolean {
    return title != null && title != undefined && title != '';
}

export function LocationNameNotValidError(title: string): Error {
    return new Error(`${LOCATION_CONSTANTS.MESSAGES.LOCATION_CANT_BE_NULL}: ${title}`)
}
