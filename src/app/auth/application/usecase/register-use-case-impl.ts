import { Injectable } from "@angular/core";
import { AuthGatewayPort } from "../../domain/port/out/auth-gateway-port";
import { LoginResponse } from "../../domain/model/login-response";
import { RegisterUseCase } from "../../domain/port/in/register-use-case";
import { RegisterRequest } from "../../domain/model/register-request";
import { ensureRegisterRequestIsValid } from "../../domain/validation/register-request-validation";

@Injectable({
    providedIn: 'root',
})
export class RegisterUseCaseImpl extends RegisterUseCase {


    private authGateway: AuthGatewayPort;

    constructor(authGateway: AuthGatewayPort) {
        super();
        this.authGateway = authGateway;
    }

    override register(registerRequest: RegisterRequest): Promise<LoginResponse> {

        ensureRegisterRequestIsValid(registerRequest);
        return this.authGateway.register(registerRequest);

    }

}