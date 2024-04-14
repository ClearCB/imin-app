import { LoginResponse } from "../../model/login-response";
import { RefreshTokenRequest } from "../../model/refresh-token-request";

export abstract class RefreshTokenUseCase {

    abstract refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<LoginResponse>;

}