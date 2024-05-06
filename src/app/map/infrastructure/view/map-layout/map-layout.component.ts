import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomMapComponent } from '../custom-map/custom-map.component';
import { EventModel } from '../../../../event/domain/model/event-model';
import { LatLng, Marker } from 'leaflet';
import { EventService } from '../../../../event/infrastructure/service/event.service';
import L, { icon } from "leaflet";
import { searchOnlineEvent } from '../../../../event/application/search-event/search-event-precon-searchs';

@Component({
  selector: 'app-map-layout',
  standalone: true,
  imports: [CustomMapComponent,],
  templateUrl: './map-layout.component.html',
  styleUrl: './map-layout.component.scss'
})
export class MapLayoutComponent implements OnInit {

  @Output() searchEventEmiter: EventEmitter<EventModel> = new EventEmitter<EventModel>();
  @Output() markerMouseOut: EventEmitter<boolean> = new EventEmitter<boolean>();


  public latLangMarkers: LatLng[] = [];
  public markers: Marker[] = [];

  @Input()
  events: EventModel[] = [];

  constructor(
    private eventService: EventService
  ) { }

  async ngOnInit(): Promise<void> {

    if (this.events.length > 0) {
      this.latLangMarkers = this.events.map(event => new LatLng(
        event.latitude, event.longitude
      ))

      this.markers = this.mapToMarker()
    }

  }

  private mapToMarker() {

    var cafe = L.icon({
      iconUrl: 'assets/markers/cafe.png',
      iconSize: [20, 20], // size of the icon
      iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    });

    return this.latLangMarkers.map(ll => new Marker(ll, { icon: cafe }))
  }

  async handleClickMarker(event: any) {

    this.searchEventEmiter.emit(event);
  }

  async handleMouseOutMarker(event: any) {

    this.markerMouseOut.emit(event);
  }
}
