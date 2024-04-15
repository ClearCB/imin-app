import { AUTH_CONSTANTS } from "../../auth-constants";

export interface LoginRequest {

    username: string;
    password: string;

}

export function ensureLoginRequestIsValid(loginRequest: LoginRequest): void {

    if (!isValidLoginUsername(loginRequest.username)) {
        throw LoginUsernameNotValidError(loginRequest.username);
    }

}

export function isValidLoginUsername(username: string): boolean {
    return username != null && username != undefined && username != '';
}

export function LoginUsernameNotValidError(username: string): Error {
    return new Error(`${AUTH_CONSTANTS.MESSAGES.VALIDATION.INVALID_USERNAME}: ${username}`)
}
