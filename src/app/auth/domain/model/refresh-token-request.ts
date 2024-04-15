import { AUTH_CONSTANTS } from "../../auth-constants";
import { isValidLoginUsername, LoginUsernameNotValidError } from "./login-request";

export interface RefreshTokenRequest {

    userId: string;
    refreshToken: string;

}

export function ensureRefreshTokenRequestIsValid(refreshTokenRequest: RefreshTokenRequest): void {

    if (!isValidLoginUsername(refreshTokenRequest.refreshToken)) {
        throw LoginUsernameNotValidError(refreshTokenRequest.refreshToken);
    }

}

export function isValidRefreshToken(refreshToken: string): boolean {
    return refreshToken != null && refreshToken != undefined && refreshToken != '';
}


export function RefreshTokenValidError(username: string): Error {
    return new Error(`${AUTH_CONSTANTS.MESSAGES.VALIDATION.INVALID_USERNAME}: ${username}`)
}


