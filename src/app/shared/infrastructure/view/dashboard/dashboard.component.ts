import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { LoginService } from '../../../../auth/infrastructure/service/login.service';
import { LoginResponse } from '../../../../auth/domain/model/login-response';
import { NotificationService } from '../../service/notification.service';
import { ThemeService } from '../../service/theme.service';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';
import { EventService } from '../../../../event/infrastructure/service/event.service';
import { EventModel } from '../../../../event/domain/model/event-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  userLoggedIn: boolean = false;
  userInfo?: LoginResponse;
  tokenData?: any;


  constructor(private loginService: LoginService,
    private notificationService: NotificationService,
    private themeService: ThemeService,
    private authService: AuthService,
    private eventService: EventService) {

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


    this.userLoggedIn = this.authService.isAuthenticated();

    if (this.userLoggedIn) {
      const userData = this.authService.getUserData();

      if (userData) {
        this.userInfo = userData;
      }
      this.notificationService.showSuccess(JSON.stringify(this.authService.getUserData()));
    }
  }


  async petition() {

    let event: EventModel = {
      id: "",
      title: "mytitle",
      smallDescription: "mysmalldescription",
      largeDescription: "largeDescription"
    }

    const res = await this.eventService.createEvent(event);

    if (res) {

      event = res;
    }


    event = {
      id: event.id,
      title: "mytitle UPDATED",
      smallDescription: "mysmalldescription UPDATED",
      largeDescription: "largeDescription UPDATED"
    }

    if (event.id) {
      const updatedEvent = await this.eventService.updateEvent(event.id, event);
    }

    let eventGet: EventModel | undefined;

    if (event.id) {
      eventGet = await this.eventService.getEvent(event.id);
    }

    if (eventGet) {

      if (eventGet.id) {
        await this.eventService.deleteEvent(eventGet.id);
      }
    }

  }


  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
    this.authService.logout();
    this.notificationService.showSuccess("LOgged out");
  }

}
