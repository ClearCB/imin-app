import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../../domain/model/register-request';
import { AuthService } from '../../service/auth.service';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';

import { PasswordModule } from 'primeng/password';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    CheckboxModule, ButtonModule,
    RippleModule, InputTextModule,
    PasswordModule, FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginError: string = "";
  registerRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.REGISTER}`;

  // Forms
  loginForm = this.formBuilder.group({
    username: ["", [Validators.required]],
    password: ["", Validators.required]
  },
    { updateOn: 'blur' })

  // Getters 
  get username() { return this.loginForm.controls.username }
  get password() { return this.loginForm.controls.password }

  constructor(
    private formBuilder: FormBuilder,
    private routeService: Router,
    private authService: AuthService,
    private dialogService: DialogService) {

    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }

  async login() {

    if (this.loginForm.valid) {

      const loginRequest = this.loginForm.value as RegisterRequest;
      const loginResponse = await this.authService.login(loginRequest);

      if (loginResponse) {

        if (!loginResponse.userData.token && loginResponse.message === "Not enabled user") {
          this.routeService.navigateByUrl(`/${SHARED_CONSTANTS.ENDPOINTS.VERIFICATION}`);
        } else if (loginResponse.userData && loginResponse.userData) {
          this.routeService.navigateByUrl(`/${SHARED_CONSTANTS.ENDPOINTS.HOME}`);
        }

      }

    } else {

      this.loginForm.markAllAsTouched();

    }

  }

}
