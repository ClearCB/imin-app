import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_CONSTANTS } from '../../auth-constants';
import { LoginResponse } from '../../domain/model/login-response';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // const loginService = inject(AuthService);

  const tokenData = localStorage.getItem(AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA);
  let cloneRequest;

  if (tokenData) {

    const tokenParsed = JSON.parse(tokenData) as LoginResponse;
    cloneRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${tokenParsed.userData.token}`) });

  } else {

    cloneRequest = req;

  }

  return next(cloneRequest)
  // .pipe(
  //   catchError(async (error: HttpErrorResponse) => {

  //     if (error.status === 401) {

  //       const isRefresh = false; // Check if refresh token is available and valid.
  //       if (isRefresh) {

  //         try {


  //           const refreshToken = await loginService.refreshToken();

  //           if (refreshToken) {
  //             return next(cloneRequest);
  //           } else {
  //             loginService.logout();
  //           }

  //         } catch (e: any) {
  //           loginService.logout();
  //           throwError(() => e);
  //         }

  //       }

  //       return next(cloneRequest);
  //     }

  //     return throwError(() => error);

  //   }));
};
