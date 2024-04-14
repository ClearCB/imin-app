import { AUTH_CONSTANTS } from "../../auth-constants";
import { LoginRequest } from "../model/login-request";
import { AuthValidationError } from "../error/auth-validation-error";

export function ensureLoginRequestIsValid(loginRequest: LoginRequest): void {

    validateLoginRequest(loginRequest);

}

function validateLoginRequest(loginRequest: LoginRequest) {

    if (!loginRequest.username) {
        throw new AuthValidationError(AUTH_CONSTANTS.MESSAGES.INVALID_LOGIN_REQUEST);
    }

}
