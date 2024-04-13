import { LoginRequest } from "../../model/login-request";
import { LoginResponse } from "../../model/login-response";

export abstract class LoginUseCase {
    abstract login(loginRequest: LoginRequest): LoginResponse;
}