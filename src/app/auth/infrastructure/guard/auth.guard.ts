import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../../../shared/infrastructure/service/notification.service';
import { SHARED_CONSTANTS } from '../../../shared/shared-constants';
import { AUTH_CONSTANTS } from '../../auth-constants';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {

    authService.logout();
    notificationService.showWarn(AUTH_CONSTANTS.MESSAGES.NOT_VALID_SESSION)
    const urlTreeReturn = router.createUrlTree([`/${SHARED_CONSTANTS.ENDPOINTS.FORBIDDEN}`]);
    return urlTreeReturn;
  }
};
