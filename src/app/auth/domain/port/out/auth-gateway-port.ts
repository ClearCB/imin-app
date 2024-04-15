import { LoginRequest } from "../../model/login-request";
import { LoginResponse } from "../../model/login-response";
import { RegisterRequest } from "../../model/register-request";

export abstract class AuthGatewayPort {

    abstract login(loginRequest: LoginRequest): Promise<LoginResponse | undefined>;
    abstract register(registerRequest: RegisterRequest): Promise<LoginResponse | undefined>;
    // abstract refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<LoginResponse | undefined>;

}