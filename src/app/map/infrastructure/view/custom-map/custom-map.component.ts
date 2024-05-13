import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import L, { icon, LatLng, marker, Marker, popup } from "leaflet";
import { async } from "rxjs";
import { EventModel } from "../../../../event/domain/model/event-model";
import { e } from "@fullcalendar/core/internal-common";
import { Router } from "@angular/router";
import { DynamicDialogRef, DialogService } from "primeng/dynamicdialog";
import { EventCreateFormComponent } from "../../../../event/infrastructure/view/event-create-form/event-create-form.component";
import { FileService } from "../../../../shared/infrastructure/service/file-service.service";
import { EventDetailComponent } from "../../../../event/infrastructure/view/event-detail/event-detail.component";
import { categoryIcon } from "../../../../shared/domain/model/category";

@Component({
  selector: 'app-custom-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './custom-map.component.html',
  styleUrl: './custom-map.component.scss'
})
export class CustomMapComponent implements AfterViewInit, OnChanges {

  ref: DynamicDialogRef | undefined;
  private map: any;

  @Input()
  public events: EventModel[] = [];

  @Input()
  public style?: { height?: string };

  @Output() searchEventEmiter: EventEmitter<EventModel> = new EventEmitter<EventModel>();
  @Output() markerMouseOn: EventEmitter<EventModel> = new EventEmitter<EventModel>();
  @Output() markerMouseOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() mapClickedEmiiter: EventEmitter<{ lat: number, lang: number }> = new EventEmitter<{ lat: number, lang: number }>();

  markers: any;

  markerToCreate: any;

  constructor(private router: Router, private fileService: FileService, private dialogService: DialogService) { }

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

    if (navigator.geolocation) {

      this.markers = L.layerGroup();
      this.markerToCreate = L.layerGroup();

      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        this.map = L.map('map', {
          center: new LatLng(latitude, longitude),
          zoom: 5,
          layers: [this.markers, this.markerToCreate]
        });

        this.initMap();

      }, () => {

        this.map = L.map('map', {
          center: new LatLng(latitude, longitude),
          zoom: 5,
          layers: [this.markers, this.markerToCreate]
        });

        this.initMap()
      });
    }
  }

  private initMapConfiguration() {

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    tiles.addTo(this.map);

    this.map.on('click', (e: any) => {

      this.handleClickMapClicked(e.latlng);
    })

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

      marker.on('mouseover', (e: any) => {
        this.handleClickMarkerOver(event);
      });

      marker.on('mouseout', (e: any) => {
        this.handleClickMarkerOut(event);
      });

      marker.on('click', (e: any) => {
        this.handleClickMarker(event);
      });

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

  async handleClickMarker(event: any) {
    this.goToEventDetail(event);
    this.searchEventEmiter.emit(event);
  }

  async handleClickMarkerOut(event: any) {
    this.markerMouseOut.emit(true);
  }

  async handleClickMarkerOver(event: any) {
    this.markerMouseOn.emit(event);
  }

  async handleClickMapClicked(latLang: any) {
    if (this.events.length == 0 && latLang && latLang.lat && latLang.lng) {

      this.markerToCreate.clearLayers()

      const iconUrl = this.getIconUrl("default");

      const markerIcon = L.icon({
        iconUrl: `assets/markers/${iconUrl}`,
        iconSize: [20, 20],
      });

      const marker = L.marker([latLang.lat, latLang.lng], { icon: markerIcon }).addTo(this.markerToCreate);
      this.mapClickedEmiiter.emit({ lat: latLang.lat, lang: latLang.lng });
    }
  }

  goToEventDetail(event: EventModel) {

    this.ref = this.dialogService.open(EventDetailComponent, {
      data: event,
      header: 'Select a Product',
      width: '85vw',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      baseZIndex: 10000,
      maximizable: true
    });

  }
} 