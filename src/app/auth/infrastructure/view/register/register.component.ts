import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../../domain/model/register-request';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  loginError: string = "";

  // Forms
  loginForm = this.formBuilder.group({
    username: ["admin", [Validators.required]],
    password: ["admin", Validators.required],
    confirmationPassword: ["admin", Validators.required]
  })

  // Getters 
  get username() { return this.loginForm.controls.username }
  get password() { return this.loginForm.controls.password }
  get confirmationPassword() { return this.loginForm.controls.confirmationPassword }

  constructor(
    private formBuilder: FormBuilder,
    private routeService: Router,
    private authService: AuthService) {
  }



  async login() {

    if (this.loginForm.valid) {

      const loginRequest = this.loginForm.value as RegisterRequest;
      const loginResponse = await this.authService.register(loginRequest);

      if (loginResponse) {
        this.loginForm.reset();
        this.routeService.navigateByUrl("/home");
      }

    } else {

      this.loginForm.markAllAsTouched();

    }

    // // const mockedToken: LoginResponse = {
    // //   message: "Login succeed",
    // //   result: true,
    // //   data: {
    // //     userId: "a7b54281-5bfb-41bb-9f67-460a4ab6ed78",
    // //     username: "admin",
    // //     token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxMzAwNTA1NSwiZXhwIjo3NDY0OTYwfQ.OOx_e9o1naT7ofushOEhE4ICgF9J6pd4GWua03l0IAA",
    // //     refreshToken: "kjdtbhñerohjeork`bn,mlp",
    // //     expirationTimeInSeconds: 0
    // //   }
    // // }


    // if (this.loginForm.valid) {
    //   const formValues = this.loginForm.value as LoginRequest;

    //   // this.loginService.login(formValues).subscribe({
    //   //   next: (loginResponse) => {
    //   //     console.log("Data next: " + JSON.stringify(loginResponse));
    //   //     localStorage.setItem("tokenData", JSON.stringify(mockedToken));
    //   //   },
    //   //   error: (errorData) => {
    //   //     console.log("Data error: " + errorData);
    //   //     this.loginError = errorData;
    //   //   },
    //   //   complete: () => {
    //   //     console.log("Loggin completed");
    //   //     this.routeService.navigateByUrl("/home");
    //   //     this.loginForm.reset();
    //   //   }
    //   // });

    //   try {
    //     const loginObservable = this.loginService.login(formValues);
    //     const loginResponse = await firstValueFrom(loginObservable);
    //     mockedToken.data.token = loginResponse.data?.token;
    //     localStorage.setItem("tokenData", JSON.stringify(mockedToken.data));
    //     this.routeService.navigateByUrl("/home");
    //     this.loginForm.reset();
    //   } catch (e: any) {
    //     console.log("Error");
    //   }


    // } else {
    //   // invalid
    //   this.loginForm.markAllAsTouched();
    //   console.log("logged invalid")
    // }

  }

}
