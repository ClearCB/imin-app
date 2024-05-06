import { AfterContentChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { MapLayoutComponent } from '../../../../map/infrastructure/view/map-layout/map-layout.component';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { SearchEventComponent } from '../search-event/search-event.component';
import { EventListComponent } from '../event-list/event-list.component';
import { CustomCardEventComponent } from '../custom-card-event/custom-card-event.component';
import { NotificationService } from '../../../../shared/infrastructure/service/notification.service';

@Component({
  selector: 'app-event-map-layout',
  standalone: true,
  imports: [MapLayoutComponent, SearchEventComponent, EventListComponent, CustomCardEventComponent],
  templateUrl: './event-map-layout.component.html',
  styleUrl: './event-map-layout.component.scss'
})
export class EventMapLayoutComponent implements OnInit {

  events: EventModel[] = [];
  isDataLoaded: boolean = false;

  eventSelected: EventModel | null = null;

  constructor(
    private eventService: EventService,
    private notificationService: NotificationService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getEvents();
    // this.eventSelected = this.events[0];
  }

  private async getEvents() {
    const res = await this.eventService.getAllEvent();

    if (res) {
      this.events = res;
      this.isDataLoaded = true;
    }
  }


  handleEventSearch(eventSearch: Promise<EventModel[] | undefined>) {

    this.events.length = 0;

    eventSearch
      .then((events) => {
        if (events) {
          this.events = events;
        }
      })
      .catch((e) => {
        this.notificationService.showError(e.error.message);
      })
      .finally(() => this.isDataLoaded = true)


  }


  handleSelectMapMarker(eventSearch: any) {
    console.log(eventSearch);
    this.eventSelected = eventSearch;
  }

  handleMouseOutMarker(mouseOut: any) {
    this.eventSelected = null;
  }
}
