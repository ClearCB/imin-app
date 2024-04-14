import { Injectable } from "@angular/core";
import { LoginUseCase } from "../../domain/port/in/login-use-case";
import { LoginRequest } from "../../domain/model/login-request";
import { LoginResponse } from "../../domain/model/login-response";
import { ensureLoginRequestIsValid } from "../../domain/validation/login-request-validation";
import { AuthGatewayPort } from "../../domain/port/out/auth-gateway-port";

@Injectable({
    providedIn: 'root',
})
export class LoginUseCaseImpl extends LoginUseCase {

    private authGateway: AuthGatewayPort;

    constructor(authGateway: AuthGatewayPort) {
        super();
        this.authGateway = authGateway;
    }


    login(loginRequest: LoginRequest): Promise<LoginResponse> {

        ensureLoginRequestIsValid(loginRequest);
        return this.authGateway.login(loginRequest);

    }
}