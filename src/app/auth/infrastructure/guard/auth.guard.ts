import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../../../shared/infrastructure/service/notification.service';
import { SHARED_CONSTANTS } from '../../../shared/shared-constants';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return true;
  } else {

    authService.logout();
    const urlTreeReturn = router.createUrlTree([`/${SHARED_CONSTANTS.ENDPOINTS.FORBIDDEN}`]);
    return urlTreeReturn;
  }
};
