import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { LoginService } from '../../../../auth/infrastructure/service/login.service';
import { lastValueFrom } from 'rxjs';
import { LoginResponse } from '../../../../auth/domain/model/login-response';
import { NotificationService } from '../service/notification.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  userLoggedIn: boolean = false;
  userInfo?: LoginResponse;
  tokenData?: any;


  constructor(private loginService: LoginService,
    private notificationService: NotificationService,
    private themeService: ThemeService) {

  }
  ngOnDestroy(): void {
    // this.loginService.currentUserLoginIn.unsubscribe();
    // this.loginService.currentUserLogged.unsubscribe();
  }

  ngOnInit(): void {
    // this.loginService.currentUserLoginIn.subscribe({
    //   next: (userLoggedin) => this.userLoggedIn = userLoggedin
    // })

    // this.loginService.currentUserLogged.subscribe({
    //   next: (userData) => this.userInfo = userData
    // })


    this.tokenData = localStorage.getItem("tokenData");
  }


  async petition() {
    await lastValueFrom(this.loginService.sampleToken());
  }


  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }

}
