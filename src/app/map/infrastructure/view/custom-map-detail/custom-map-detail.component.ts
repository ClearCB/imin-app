import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import L, {LatLng, } from "leaflet";
import { EventModel } from "../../../../event/domain/model/event-model";
import { Category, categoryIcon } from "../../../../shared/domain/model/category";

@Component({
  selector: 'app-custom-map-detail',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './custom-map-detail.component.html',
  styleUrl: './custom-map-detail.component.scss'
})
export class CustomMapDetailComponent implements AfterViewInit, OnChanges {

  private map: any;

  @Input()
  public events: EventModel[] = [];

  @Input()
  public style?: { height?: string };

  @Output() markerClick: EventEmitter<EventModel> = new EventEmitter<EventModel>();
  @Output() markerMouseOn: EventEmitter<EventModel> = new EventEmitter<EventModel>();
  @Output() markerMouseOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() mapClickedEmiiter: EventEmitter<{ lat: number, lang: number }> = new EventEmitter<{ lat: number, lang: number }>();

  markers: any;

  @Input()
  category: Category | null = null;

  markerToCreate: any;


  ngAfterViewInit(): void {
    this.getMapCenter();
  }

  ngOnChanges() {

    if (this.map) {
      this.removeMarkers();
      this.prepareEventMarkers();
    }

   
  }

  private removeMarkers() {

    if (this.markers) {

      this.markers.clearLayers();

    }
  }

  private getMapCenter() {

    let latitude = 39.0000;
    let longitude = 2.96666;

    if (navigator.geolocation && !this.map) {

      this.markers = L.layerGroup();
      this.markerToCreate = L.layerGroup();

      navigator.geolocation.getCurrentPosition((position) => {
        // latitude = position.coords.latitude;
        // longitude = position.coords.longitude;

        if (this.events && this.events.length > 0){
          latitude = this.events[0].latitude;
          longitude = this.events[0].longitude;
        }

        this.map = L.map('mapDetail', {
          center: new LatLng(latitude, longitude),
          zoom: 5,
          layers: [this.markers, this.markerToCreate]
        });

        this.initMap();

      }, () => {

        this.map = L.map('mapDetail', {
          center: new LatLng(latitude, longitude),
          zoom: 5,
          layers: [this.markers, this.markerToCreate]
        });

        this.initMap()
      });
    } else if (this.map){

      this.prepareEventMarkers();
    }
  }

  private initMapConfiguration() {

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    tiles.addTo(this.map);

  }

  private prepareEventMarkers() {

    this.markers.clearLayers()

    this.events.forEach((event) => {

      const eventCategory = event.categories && event.categories.length > 0
        ? event.categories[0].icon
        : "default";

      const iconUrl = this.getIconUrl(eventCategory);

      const markerIcon = L.icon({
        iconUrl: `assets/markers/${iconUrl}`,
        iconSize: [20, 20],
      });

      const marker = L.marker([event.latitude, event.longitude], { icon: markerIcon }).addTo(this.markers);

    })

  }

  private getIconUrl(categoryId: string) {

    if (categoryId in categoryIcon) {
      return categoryIcon[categoryId];
    } else {
      return categoryIcon["default"];
    }
  }

  private initMap(): void {

    this.initMapConfiguration();
    this.prepareEventMarkers();

  }

} 