import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../../auth/infrastructure/service/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit, OnDestroy {
  userLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {

  }

  ngOnDestroy(): void {
    // this.loginService.currentUserLoginIn.unsubscribe();
  }


  ngOnInit(): void {
    // this.loginService.currentUserLoginIn.subscribe({
    //   next: (userLoggedin) => this.userLoggedIn = userLoggedin
    // })
  }


  logout(): void {
    this.loginService.logout();
  }
}
