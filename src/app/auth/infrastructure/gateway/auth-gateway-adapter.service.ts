import { Injectable } from '@angular/core';
import { AuthGatewayPort } from '../../domain/port/out/auth-gateway-port';
import { LoginResponse } from '../../domain/model/login-response';
import { LoginRequest } from '../../domain/model/login-request';
import { RefreshTokenRequest } from '../../domain/model/refresh-token-request';
import { RegisterRequest } from '../../domain/model/register-request';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AUTH_CONSTANTS } from '../../auth-constants';
import { ApiError } from '../../domain/error/api-error';

@Injectable({
  providedIn: 'root'
})
export class AuthGatewayAdapterService extends AuthGatewayPort {

  constructor(private httpClient: HttpClient) {
    super();
  }

  override async login(loginRequest: LoginRequest): Promise<LoginResponse> {

    const body = JSON.stringify(loginRequest);
    const url = `${AUTH_CONSTANTS.API.BASE_URL}${AUTH_CONSTANTS.API.ENDPOINTS.LOGIN}`;

    try {
      return await lastValueFrom(this.httpClient.post<LoginResponse>(url, body));
    } catch (e: any) {
      console.error(e.message);
      throw new ApiError(AUTH_CONSTANTS.MESSAGES.GENERIC_LOGIN_ERROR);
    }

  }


  override async register(registerRequest: RegisterRequest): Promise<LoginResponse> {

    const body = JSON.stringify(registerRequest);
    const url = `${AUTH_CONSTANTS.API.BASE_URL}${AUTH_CONSTANTS.API.ENDPOINTS.REGISTER}`;

    try {
      return await lastValueFrom(this.httpClient.post<LoginResponse>(url, body));
    } catch (e: any) {
      console.error(e.message);
      throw new ApiError(AUTH_CONSTANTS.MESSAGES.GENERIC_LOGIN_ERROR);
    }

  }

  override async refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<LoginResponse> {

    const body = JSON.stringify(refreshTokenRequest);
    const url = `${AUTH_CONSTANTS.API.BASE_URL}${AUTH_CONSTANTS.API.ENDPOINTS.REFRESH_TOKEN}`;

    try {
      return await lastValueFrom(this.httpClient.post<LoginResponse>(url, body));
    } catch (e: any) {
      console.error(e.message);
      throw new ApiError(AUTH_CONSTANTS.MESSAGES.GENERIC_LOGIN_ERROR);
    }

  }

}
