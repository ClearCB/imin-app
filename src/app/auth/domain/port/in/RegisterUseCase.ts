import { LoginResponse } from "../../model/login-response";
import { RegisterRequest } from "../../model/register-request";

export interface RegisterUseCase {
    register(registerRequest: RegisterRequest): LoginResponse;
}