import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';
import { RegisterRequest } from '../../../domain/model/register-request';
import { AuthService } from '../../service/auth.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { EmailService } from '../../../../mail/infrastructure/service/email.service';
import { UserData } from '../../../domain/model/user-token-data';

@Component({
  selector: 'app-verication-code',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    CheckboxModule, ButtonModule,
    RippleModule, InputTextModule,
    PasswordModule, FormsModule
  ],
  templateUrl: './verication-code.component.html',
  styleUrl: './verication-code.component.scss'
})
export class VericationCodeComponent implements OnInit {

  public userData: string | undefined;
  constructor(
    private emailService: EmailService,
    private authService: AuthService) {
  }
  ngOnInit(): void {
    const activeUsername = this.authService.currentUsername;

    if (activeUsername) {
      this.userData = activeUsername;
    }
  }

  public resendEmailVerification(username: string | undefined) {
    if (username) {
      this.emailService.sendEmailVerification(username);
    }
  }

}
