import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../../domain/model/register-request';
import { AuthService } from '../../service/auth.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    CheckboxModule, ButtonModule,
    RippleModule, InputTextModule,
    PasswordModule, FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerError: string | null = "";
  loginRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.LOGIN}`;

  // Forms
  registerForm = this.formBuilder.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    confirmationPassword: ["", Validators.required]
  }, {
    validators: [this.validationRegexPassword('password'), this.matchValidator('password', 'confirmationPassword')],
    updateOn: 'blur'
  })

  // Getters 
  get username() { return this.registerForm.controls.username }
  get password() { return this.registerForm.controls.password }
  get email() { return this.registerForm.controls.email }
  get confirmationPassword() { return this.registerForm.controls.confirmationPassword }

  constructor(
    private formBuilder: FormBuilder,
    private routeService: Router,
    private authService: AuthService) {
  }



  async register() {

    if (this.registerForm.valid) {

      const loginRequest = this.registerForm.value as RegisterRequest;
      const loginResponse = await this.authService.register(loginRequest);

      if (loginResponse && loginResponse.result) {
        this.registerForm.reset();
        this.routeService.navigateByUrl(`/${SHARED_CONSTANTS.ENDPOINTS.VERIFICATION}`);
      }

    } else {

      this.registerForm.markAllAsTouched();

    }
  }

  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Passwords do not match.' };
        matchingControl!.setErrors(error);
        this.registerError = error.confirmedValidator;
        return error;
      } else {
        this.registerError = null;
        matchingControl!.setErrors(null);
        return null;
      }
    }
  }

  validationRegexPassword(controlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      if (!control) {
        return null;
      }

      const password = control.value;
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (password && !passwordRegex.test(password)) {
        const error = { invalidPassword: 'Password must be at least 8 characters long and include at least one uppercase letter and one number.' };
        control.setErrors(error);
        this.registerError =  error.invalidPassword;
        return { invalidPassword: true };
      } else {
        this.registerError = null;
        control.setErrors(null);
        return null;
      }
    };

  }

}


