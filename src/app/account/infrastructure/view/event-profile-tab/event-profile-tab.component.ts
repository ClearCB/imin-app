import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { EventListComponent } from '../../../../event/infrastructure/view/event-list/event-list.component';
import { EventModel } from '../../../../event/domain/model/event-model';
import { EventService } from '../../../../event/infrastructure/service/event.service';
import { AuthService } from '../../../../auth/infrastructure/service/auth.service';
import { UserData } from '../../../../auth/domain/model/user-token-data';

@Component({
  selector: 'app-event-profile-tab',
  standalone: true,
  imports: [TabViewModule, EventListComponent],
  templateUrl: './event-profile-tab.component.html',
  styleUrl: './event-profile-tab.component.scss'
})
export class EventProfileTabComponent implements OnInit {

  dataLoaded: boolean = false;
  events: EventModel[] = [];
  userData?: UserData;

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
      const eventResponse = await this.eventService.getUserAttendance(this.userData);

      if (eventResponse){
        this.events = eventResponse;
      }
    }

    this.dataLoaded = true;
  }




}
