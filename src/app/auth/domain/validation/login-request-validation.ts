import { LoginRequest } from "../model/login-request";

class LoginRequestValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export function ensureLoginRequestIsValid(loginRequest: LoginRequest): void {

    validateLoginRequest(loginRequest);

}

function validateLoginRequest(loginRequest: LoginRequest) {

    if (!loginRequest.username) {
        throw new LoginRequestValidationError("Invalid");
    }
}
