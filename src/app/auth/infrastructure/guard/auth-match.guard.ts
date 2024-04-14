import { CanActivateFn } from '@angular/router';

export const authMatchGuard: CanActivateFn = (route, state) => {
  return true;
}; // Si es falso, busca una url que coincida con la misma rute del path.
