import { LoginRequest } from "../../model/login-request";
import { LoginResponse } from "../../model/login-response";
import { RefreshTokenRequest } from "../../model/refresh-token-request";
import { RegisterRequest } from "../../model/register-request";

export abstract class AuthGatewayPort {

    abstract login(loginRequest: LoginRequest): LoginResponse;
    abstract register(registerRequest: RegisterRequest): LoginResponse;
    abstract refreshToken(refreshTokenRequest: RefreshTokenRequest): LoginResponse;

}