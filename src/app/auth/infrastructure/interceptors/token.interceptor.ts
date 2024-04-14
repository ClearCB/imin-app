import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';
import { AUTH_CONSTANTS } from '../../auth-constants';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);

  // Extract data if present
  const tokenData = localStorage.getItem(AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA);
  let cloneRequest;

  if (tokenData) {

    const tokenParsed = JSON.parse(tokenData);

    const headers = req.headers;
    headers.append('Authorization', `Bearer ${tokenParsed.token}`);

    cloneRequest = req.clone({ headers: headers });

  } else {

    cloneRequest = req;

  }

  return next(cloneRequest)
    .pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {

          const isRefresh = false; // Check if refresh token is available and valid.
          if (isRefresh) {

            return loginService.refreshToken()
              .pipe(
                switchMap(() => {
                  return next(cloneRequest);
                }),
                catchError((e: any) => {
                  loginService.logout();
                  return throwError(() => e);
                })
              );
          }

          return next(cloneRequest);
        }

        return throwError(() => error);

      }));
};
