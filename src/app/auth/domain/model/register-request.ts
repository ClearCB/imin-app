import { AUTH_CONSTANTS } from "../../auth-constants";

export interface RegisterRequest {

    username: string;
    password: string;
    confirmationPassword: string;

}


export function ensureRegisterRequestIsValid(registerRequest: RegisterRequest): void {

    if (!isValidRegisterUsername(registerRequest.username)) {
        throw RegisterUsernameNotValidError(registerRequest.username);
    }

}

export function isValidRegisterUsername(username: string): boolean {
    return username != null && username != undefined && username != '';
}

export function RegisterUsernameNotValidError(username: string): Error {
    return new Error(`${AUTH_CONSTANTS.MESSAGES.VALIDATION.INVALID_USERNAME}: ${username}`)
}