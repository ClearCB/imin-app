import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AUTH_CONSTANTS } from '../../auth-constants';
import { LoginRequest } from '../../domain/model/login-request';
import { LoginResponse } from '../../domain/model/login-response';
import { RegisterRequest } from '../../domain/model/register-request';

@Injectable({
  providedIn: 'root'
})
export class ExternalApiService {

  constructor(private httpClient: HttpClient) {
  }

  login(loginRequest: LoginRequest): Promise<LoginResponse> {

    const body = JSON.stringify(loginRequest);
    const url = `${AUTH_CONSTANTS.API.BASE_URL}${AUTH_CONSTANTS.API.ENDPOINTS.LOGIN}`;

    return lastValueFrom(this.httpClient.post<LoginResponse>(url, body));

  }


  register(registerRequest: RegisterRequest): Promise<LoginResponse> {

    const body = JSON.stringify(registerRequest);
    const url = `${AUTH_CONSTANTS.API.BASE_URL}${AUTH_CONSTANTS.API.ENDPOINTS.REGISTER}`;

    return lastValueFrom(this.httpClient.post<LoginResponse>(url, body));

  }

  // refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<LoginResponse> {

  //   const body = JSON.stringify(refreshTokenRequest);
  //   const url = `${AUTH_CONSTANTS.API.BASE_URL}${AUTH_CONSTANTS.API.ENDPOINTS.REFRESH_TOKEN}`;

  //   return lastValueFrom(this.httpClient.post<LoginResponse>(url, body));

  // }
}
