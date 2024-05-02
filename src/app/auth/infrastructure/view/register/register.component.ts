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

  // Forms
  registerForm = this.formBuilder.group({
    username: ["admin", Validators.required],
    password: ["admin", Validators.required],
    confirmationPassword: ["admin", Validators.required]
  }, {
    validators: this.matchValidator('password', 'confirmationPassword'),
    updateOn: 'blur'
  })

  // Getters 
  get username() { return this.registerForm.controls.username }
  get password() { return this.registerForm.controls.password }
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
        this.routeService.navigateByUrl("/home");
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

  trimV(controlName: string, matchingControlName: string): ValidatorFn {
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

}


