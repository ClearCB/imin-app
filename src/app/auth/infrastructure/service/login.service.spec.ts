import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService, HttpClient, HttpHandler] // Provide MessageService here
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
