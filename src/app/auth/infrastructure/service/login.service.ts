import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { LoginRequest } from '../../domain/model/login-request';
import { LoginResponse } from '../../domain/model/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get userLoggedIn(): Observable<boolean> {
    return this.currentUserLoginIn.asObservable();
  }

  // get the data in cookie / session storage and retrive if logged in
  // currentUserLogged: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>({
  //   data: { userId: "", username: "", token: "", refreshToken: "", expirationTimeInSeconds: 0 },
  //   message: "",
  //   result: true,
  // });

  // get userData(): Observable<LoginResponse> {
  //   return this.currentUserLogged.asObservable();
  // }

  public $refreshToken = new Subject<boolean>;


  constructor(private httpClient: HttpClient) {
    // this.$refreshToken.subscribe((res: any) => {
    //   this.refreshToken();
    // })
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    // Make a petition to our api

    const body = {
      "username": loginRequest.username,
      "password": loginRequest.password
    }

    return this.httpClient.post<any>("http://localhost:8080/auth/login", body);

    // return this.httpClient.post<any>("http://localhost:8080/auth/login", body)
    //   .pipe(
    //     tap((userData: LoginResponse) => {
    //       this.currentUserLogged.next(userData);
    //       this.currentUserLoginIn.next(true);
    //     }),
    //     catchError(this.handleError)
    //   );

    // return this.httpClient.get<LoginResponse>("../../assets/mock/data.json")
    //   .pipe(
    //     tap((userData: LoginResponse) => {
    //       this.currentUserLogged.next(userData);
    //       this.currentUserLoginIn.next(true);
    //     }),
    //     catchError(this.handleError)
    //   );
  }

  // logout(): void {
  //   // Remove the token of cookei or what ever
  //   this.currentUserLogged?.next({
  //     data: { userId: "", username: "", token: "", refreshToken: "", expirationTimeInSeconds: 0 },
  //     message: "",
  //     result: true,
  //   });
  //   this.currentUserLoginIn.next(false);
  //   localStorage.removeItem("tokenData");
  // }

  // refreshToken() {
  //   const tokenData: any = localStorage.getItem("tokenData");

  //   const body = { refreshToken: JSON.parse(tokenData).refreshToken };


  //   return this.httpClient.post<any>("http://localhost:8080/auth/refreshToken", body);
  // }



  sampleToken() {
    // const tokenData: any = localStorage.getItem("tokenData");

    const body = {
      "actorId": "a7b54281-5bfb-41bb-9f67-460a4ab6ed78",
      "objectId": "e1613763-32ad-4b67-8b13-dbf13d617f30",
      "actionId": "dab3ef61-7d3e-4a3c-ba07-4634462fc2ee"
    };


    return this.httpClient.post<any>("http://localhost:8080/api/v1/auth/authorize/event", body);
  }


  private handleError(httpError: HttpErrorResponse) {

    if (httpError.status === 0) { // no data
      console.log('Se ha producido un error ', httpError.message)
    } else {
      console.log('Backend error: ', httpError.status, httpError.error)
    }

    return throwError(() => new Error("Algo falló!"))
  }

}
