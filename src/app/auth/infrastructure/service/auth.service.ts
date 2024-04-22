import { Injectable } from '@angular/core';
import { LoginResponse } from '../../domain/model/login-response';
import { AUTH_CONSTANTS } from '../../auth-constants';
import { NotificationService } from '../../../shared/infrastructure/service/notification.service';
import { LoginRequest } from '../../domain/model/login-request';
import { login } from '../../application/login/login-use-case';
import { AuthGatewayPort } from '../../domain/port/out/auth-gateway-port';
import { LocalStorageRepositoryPort } from '../../../shared/domain/port/out/local-storage-repository-port';
import { logout } from '../../application/logout/logout-use-case';
import { register } from '../../application/register/register-use-case';
import { RegisterRequest } from '../../domain/model/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // get the data in cookie / session storage and retrive if logged in
  // currentUserLogged: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);

  // get userData(): Observable<LoginResponse | null> {
  //   return this.currentUserLogged.asObservable();
  // }

  constructor(
    private notificationService: NotificationService,
    private authGateway: AuthGatewayPort,
    private localStorageRepository: LocalStorageRepositoryPort
  ) { }

  async login(loginRequest: LoginRequest): Promise<LoginResponse | undefined> {

    try {

      const loginResponse = await login(this.authGateway, loginRequest);

      if (!loginResponse?.result) {
        this.notificationService.showError(AUTH_CONSTANTS.MESSAGES.BAD_CREDENTIALS_ERROR);
        return;
      }

      this.localStorageRepository.setItem(
        AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA,
        JSON.stringify(loginResponse)
      );

      this.notificationService.showSuccess(AUTH_CONSTANTS.MESSAGES.OK_LOGIN);
      return loginResponse;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(e.error.message);
      return;
    }

  }

  logout(): void {

    try {
      logout(this.localStorageRepository);
      this.notificationService.showSuccess(AUTH_CONSTANTS.MESSAGES.OK_LOGIN);
    } catch (e: any) {
      this.notificationService.showError(AUTH_CONSTANTS.MESSAGES.GENERIC_LOGIN_ERROR);
    }

  }

  async register(registerRequest: RegisterRequest): Promise<LoginResponse | undefined> {


    try {

      const loginResponse = await register(this.authGateway, registerRequest);

      if (!loginResponse?.result) {
        this.notificationService.showError(AUTH_CONSTANTS.MESSAGES.BAD_CREDENTIALS_ERROR);
        return;
      }

      this.localStorageRepository.setItem(
        AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA,
        JSON.stringify(loginResponse)
      );

      this.notificationService.showSuccess(AUTH_CONSTANTS.MESSAGES.OK_LOGIN);
      return loginResponse;

    } catch (e: any) {

      console.error(e.message);
      this.notificationService.showError(e.error.message);
      return;
    }

  }

  // async refreshToken(): Promise<LoginResponse | undefined> {

  //   try {

  //     const userData = this.getUserData();

  //     if (!userData) {
  //       return;
  //     }

  //     const refreshTokenRequest = {
  //       userId: userData.data.userId,
  //       refreshToken: userData.data.refreshToken
  //     }

  //     const loginResponse = await refreshToken(this.authGateway, refreshTokenRequest);

  //     if (!loginResponse?.result) {
  //       this.notificationService.showError(AUTH_CONSTANTS.MESSAGES.BAD_CREDENTIALS_ERROR);
  //       return;
  //     }

  //     this.localStorageRepository.setItem(
  //       AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA,
  //       JSON.stringify(loginResponse)
  //     );

  //     this.notificationService.showSuccess(AUTH_CONSTANTS.MESSAGES.OK_LOGIN);
  //     return loginResponse;

  //   } catch (e: any) {

  //     console.error(e.message);
  //     this.notificationService.showError(AUTH_CONSTANTS.MESSAGES.GENERIC_LOGIN_ERROR);
  //     return;
  //   }

  // }

  public getUserData(): LoginResponse | null {

    const localStorageData = this.localStorageRepository.getItem(AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA);

    if (localStorageData) {
      const userData = JSON.parse(localStorageData) as LoginResponse;

      return userData;
    }

    return null;

  }

  public isAuthenticated() {

    const localStorageData = this.localStorageRepository.getItem(AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA);

    if (localStorageData) {
      const userData = JSON.parse(localStorageData) as LoginResponse;

      return userData.userData?.token.length > 0;
    }

    return false;

  }
}
