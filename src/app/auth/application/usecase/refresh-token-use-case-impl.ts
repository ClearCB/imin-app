import { Injectable } from "@angular/core";
import { LoginUseCase } from "../../domain/port/in/login-use-case";
import { AuthGatewayPort } from "../../domain/port/out/auth-gateway-port";
import { LoginRequest } from "../../domain/model/login-request";
import { LoginResponse } from "../../domain/model/login-response";
import { ensureLoginRequestIsValid } from "../../domain/validation/login-request-validation";
import { RefreshTokenUseCase } from "../../domain/port/in/refresh-token-use-case";
import { RefreshTokenRequest } from "../../domain/model/refresh-token-request";
import { ensureRefreshTokenRequestIsValid } from "../../domain/validation/refresh-token-request-validation";

@Injectable({
    providedIn: 'root',
})
export class RefreshTokenUseCaseImpl extends RefreshTokenUseCase {

    private authGateway: AuthGatewayPort;

    constructor(authGateway: AuthGatewayPort) {
        super();
        this.authGateway = authGateway;
    }

    override refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<LoginResponse> {

        ensureRefreshTokenRequestIsValid(refreshTokenRequest);
        return this.authGateway.refreshToken(refreshTokenRequest);

    }

}