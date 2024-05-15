import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { EventService } from '../service/event.service';
import { inject } from '@angular/core';
import { SHARED_CONSTANTS } from '../../../shared/shared-constants';
import { AuthService } from '../../../auth/infrastructure/service/auth.service';

export const isEventAdminGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const eventService = inject(EventService);
  const router = inject(Router);
  const routerActivated = inject(ActivatedRoute);

  console.log(route);

  
  let eventParamId;
  if (route && route.params && route.params['eventId']){
    eventParamId = route.params['eventId']
  }

  let isAdmin = false;
  if (eventParamId) {
    const userId = authService.getUserData()?.userData.id;
    const event = await eventService.getEvent(eventParamId);

    isAdmin = userId === event?.userId;
  }


  if (isAdmin) {
    return true;
  } else {
    const urlTreeReturn = router.createUrlTree([`/${SHARED_CONSTANTS.ENDPOINTS.FORBIDDEN}`]);
    return urlTreeReturn;
  }

  return false;
};
