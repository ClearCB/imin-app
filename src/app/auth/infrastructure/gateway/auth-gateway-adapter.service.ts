import { Injectable } from '@angular/core';
import { AuthGatewayPort } from '../../domain/port/out/auth-gateway-port';
import { LoginResponse } from '../../domain/model/login-response';
import { LoginRequest } from '../../domain/model/login-request';
import { RegisterRequest } from '../../domain/model/register-request';
import { ExternalApiService } from './external-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGatewayAdapterService extends AuthGatewayPort {

  constructor(private externalApiService: ExternalApiService) {
    super();
  }

  override login(loginRequest: LoginRequest): Promise<LoginResponse> {

    return this.externalApiService.login(loginRequest);

  }


  override async register(registerRequest: RegisterRequest): Promise<LoginResponse> {

    return this.externalApiService.register(registerRequest);

  }

  // override async refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<LoginResponse> {

  //   return this.externalApiService.refreshToken(refreshTokenRequest);

  // }

}
