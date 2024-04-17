import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';
import { AuthGatewayPort } from '../../domain/port/out/auth-gateway-port';
import { LocalStorageRepositoryPort } from '../../../shared/domain/port/out/local-storage-repository-port';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, AuthGatewayPort, LocalStorageRepositoryPort, AuthGatewayPort] // Provide MessageService here
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
