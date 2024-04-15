import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../../auth/infrastructure/service/login.service';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit, OnDestroy {
  userLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnDestroy(): void {
    // this.loginService.currentUserLoginIn.unsubscribe();
  }


  ngOnInit(): void {
    // this.loginService.currentUserLoginIn.subscribe({
    //   next: (userLoggedin) => this.userLoggedIn = userLoggedin
    // })

    this.userLoggedIn = this.authService.isAuthenticated();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/login")
  }
}
