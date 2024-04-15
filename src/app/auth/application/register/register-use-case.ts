import { ensureLoginRequestIsValid } from "../../domain/model/login-request";
import { LoginResponse } from "../../domain/model/login-response";
import { RegisterRequest } from "../../domain/model/register-request";
import { AuthGatewayPort } from "../../domain/port/out/auth-gateway-port";

export async function register(authGateway: AuthGatewayPort, registerRequest: RegisterRequest): Promise<LoginResponse | undefined> {

    ensureLoginRequestIsValid(registerRequest);
    return await authGateway.register(registerRequest);

}
