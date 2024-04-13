import { LoginResponse } from "../../model/login-response";
import { RefreshTokenRequest } from "../../model/refresh-token-request";

export interface RefreshTokenUseCase {
    refreshToken(refreshTokenRequest: RefreshTokenRequest): LoginResponse;
}