import { AUTH_CONSTANTS } from "../../auth-constants";
import { RegisterRequest } from "../model/register-request";
import { AuthValidationError } from "../error/auth-validation-error";

export function ensureRegisterRequestIsValid(registerRequest: RegisterRequest): void {

    validateRegisterRequest(registerRequest);

}

function validateRegisterRequest(registerRequest: RegisterRequest) {

    if (!registerRequest.username) {
        throw new AuthValidationError(AUTH_CONSTANTS.MESSAGES.INVALID_REGISTER_REQUEST);
    }

}
