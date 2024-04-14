import { AUTH_CONSTANTS } from "../../auth-constants";
import { RefreshTokenRequest } from "../model/refresh-token-request";
import { RegisterRequest } from "../model/register-request";
import { AuthValidationError } from "../error/auth-validation-error";

export function ensureRefreshTokenRequestIsValid(refreshTokenRequest: RefreshTokenRequest): void {

    validateRefreshTokenRequest(refreshTokenRequest);

}

function validateRefreshTokenRequest(refreshTokenRequest: RefreshTokenRequest) {

    if (!refreshTokenRequest.refreshToken) {
        throw new AuthValidationError(AUTH_CONSTANTS.MESSAGES.INVALID_REFRESH_TOKEN_REQUEST);
    }

}
