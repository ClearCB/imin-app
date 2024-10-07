import { AUTH_CONSTANTS } from "../../auth-constants";

export interface RegisterRequest {

    username: string;
    password: string;
    confirmationPassword: string;
    email: string;

}


export function ensureRegisterRequestIsValid(registerRequest: RegisterRequest): void {

    if (!isValidRegisterUsername(registerRequest.username)) {
        throw RegisterUsernameNotValidError(registerRequest.username);
    }
    if (!isValidRegisterEmail(registerRequest.email)) {
        throw RegisterUsernameNotValidError(registerRequest.email);
    }

}

export function isValidRegisterUsername(username: string): boolean {
    return username != null && username != undefined && username != '';
}

export function isValidRegisterEmail(email: string): boolean {
    return email != null && email != undefined && email != '';
}

export function RegisterUsernameNotValidError(username: string): Error {
    return new Error(`${AUTH_CONSTANTS.MESSAGES.VALIDATION.INVALID_USERNAME}: ${username}`)
}

export function RegisterEmailNotValidError(email: string): Error {
    return new Error(`${AUTH_CONSTANTS.MESSAGES.VALIDATION.INVALID_EMAIL}: ${email}`)
}