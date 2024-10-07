import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isEventAdminGuard } from './is-event-admin.guard';

describe('isEventAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isEventAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
