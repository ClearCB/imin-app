import { ensureLoginRequestIsValid, LoginRequest } from "../../domain/model/login-request";
import { LoginResponse } from "../../domain/model/login-response";
import { AuthGatewayPort } from "../../domain/port/out/auth-gateway-port";

export async function login(authGateway: AuthGatewayPort, loginRequest: LoginRequest): Promise<LoginResponse | undefined> {

    ensureLoginRequestIsValid(loginRequest);
    return await authGateway.login(loginRequest);

}