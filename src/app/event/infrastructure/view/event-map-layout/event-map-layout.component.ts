import { AfterContentChecked, AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventModel } from '../../../domain/model/event-model';
import { EventService } from '../../service/event.service';
import { SearchEventComponent } from '../search-event/search-event.component';
import { EventListComponent } from '../event-list/event-list.component';
import { CustomCardEventComponent } from '../custom-card-event/custom-card-event.component';
import { NotificationService } from '../../../../shared/infrastructure/service/notification.service';
import { CustomMapComponent } from '../../../../map/infrastructure/view/custom-map/custom-map.component';
import L, { LatLng, Marker } from 'leaflet';

@Component({
  selector: 'app-event-map-layout',
  standalone: true,
  imports: [SearchEventComponent, EventListComponent, CustomCardEventComponent, CustomMapComponent],
  templateUrl: './event-map-layout.component.html',
  styleUrl: './event-map-layout.component.scss'
})
export class EventMapLayoutComponent implements OnInit {

  events: EventModel[] = [];
  isDataLoaded: boolean = false;

  public latLangMarkers: LatLng[] = [];
  public markers: Marker[] = [];

  activeDistance: number | null = null;

  eventSelected: EventModel | null = null;

  constructor(
    private eventService: EventService,
    private notificationService: NotificationService
  ) { }

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

  handleDistanceEmitter(distance: number | null) {

    if (distance) {
      this.activeDistance = distance;
    } else {
      this.activeDistance = 0;
    }


  }

  async ngOnInit(): Promise<void> {

    await this.getEvents();

    if (this.events.length > 0) {
      this.latLangMarkers = this.events.map(event => new LatLng(
        event.latitude, event.longitude
      ))

    }

  }

  handleMouseOutMarker() {
    this.eventSelected = null;
  }

  handleMouseOnMarker(event: any) {
    this.eventSelected = event;
  }

  handleMarkerClick(event: any) {
    this.eventService.opentEventDetail(event);
  }
}
