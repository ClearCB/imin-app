import { Injectable } from "@angular/core";
import { LoginUseCase } from "../../domain/port/in/login-use-case";
import { AuthGatewayPort } from "../../domain/port/out/auth-gateway-port";
import { LoginRequest } from "../../domain/model/login-request";
import { LoginResponse } from "../../domain/model/login-response";
import { ensureLoginRequestIsValid } from "../../domain/validation/login-request-validation";
import { LogoutUseCase } from "../../domain/port/in/logout-use-case";
import { AUTH_CONSTANTS } from "../../auth-constants";

@Injectable({
    providedIn: 'root',
})
export class LogoutUseCaseImpl extends LogoutUseCase {

    constructor() {
        super();
    }

    override logout(): void {

        localStorage.removeItem(AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA);

    }

}