import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { EventListComponent } from '../../../../event/infrastructure/view/event-list/event-list.component';
import { EventModel } from '../../../../event/domain/model/event-model';
import { EventService } from '../../../../event/infrastructure/service/event.service';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';
import { UserData } from '../../../../auth/domain/model/user-token-data';
import { RouterLink } from '@angular/router';
import { SHARED_CONSTANTS } from '../../../../shared/shared-constants';

@Component({
  selector: 'app-event-profile-tab',
  standalone: true,
  imports: [TabViewModule, EventListComponent, RouterLink],
  templateUrl: './event-profile-tab.component.html',
  styleUrl: './event-profile-tab.component.scss'
})
export class EventProfileTabComponent implements OnInit {

  dataLoaded: boolean = false;
  activeEvents: EventModel[] = [];
  pastEvents: EventModel[] = [];
  userEvents: EventModel[] = [];
  userData?: UserData;

  mapEventRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.MAP}`;
  listEventRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.LIST}`;
  creatEventRoute: string = `/${SHARED_CONSTANTS.ENDPOINTS.EVENT.NAME}/${SHARED_CONSTANTS.ENDPOINTS.EVENT.CHILDREN.CREATE}`;

  constructor(private eventService: EventService, private authService: AuthService

  ) {

  }

  async ngOnInit() {

    this.authService.currentUserLogged.subscribe({
      next: (userData) => {
        if (userData) {
          this.userData = userData.userData
        }
      }
    })

    if (this.userData){
      const userEventsResponse = await this.eventService.getUsersEvents(this.userData);
      const userAttendance = await this.eventService.getUserAttendance(this.userData);

      if (userEventsResponse){
        this.userEvents = userEventsResponse;
      }

      if (userAttendance){
        this.activeEvents = userAttendance.filter(e => e.finishDate <= new Date());
        this.pastEvents = userAttendance.filter(e => e.finishDate > new Date());
      }
    }

    this.dataLoaded = true;
  }




}
