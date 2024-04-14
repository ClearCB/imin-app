import { LoginResponse } from "../../model/login-response";
import { RegisterRequest } from "../../model/register-request";

export abstract class RegisterUseCase {

    abstract register(registerRequest: RegisterRequest): Promise<LoginResponse>;

}