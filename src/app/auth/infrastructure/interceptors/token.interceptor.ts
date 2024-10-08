import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AUTH_CONSTANTS } from '../../auth-constants';
import { LoginResponse } from '../../domain/model/login-response';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/infrastructure/service/notification.service';
import { SHARED_CONSTANTS } from '../../../shared/shared-constants';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  const tokenData = localStorage.getItem(AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA);
  let cloneRequest;

  if (tokenData) {

    const tokenParsed = JSON.parse(tokenData) as LoginResponse;
    cloneRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${tokenParsed.userData.token}`) });

  } else {

    cloneRequest = req;

  }

  return next(cloneRequest)
    .pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401 && authService.currentUserLoginIn.value) { // User logged in already, session invalid.

          authService.logout();
          notificationService.showWarn(AUTH_CONSTANTS.MESSAGES.NOT_VALID_SESSION)
          router.navigate([`/${SHARED_CONSTANTS.ENDPOINTS.LOGIN}`]);

          return next(cloneRequest);
        }

        return throwError(() => error);

      })
    )
};
