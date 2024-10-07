import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import L, { LatLng, } from "leaflet";
import { EventModel } from "../../../../event/domain/model/event-model";
import { Category, categoryIcon } from "../../../../shared/domain/model/category";

@Component({
  selector: 'app-custom-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './custom-map.component.html',
  styleUrl: './custom-map.component.scss'
})
export class CustomMapComponent implements AfterViewInit, OnChanges {

  private map: any;

  @Input()
  public events: EventModel[] = [];

  @Input()
  isCreateFormEvent?: boolean;

  @Input()
  public style?: { height?: string };

  @Output() markerClick: EventEmitter<EventModel> = new EventEmitter<EventModel>();
  @Output() markerMouseOn: EventEmitter<EventModel> = new EventEmitter<EventModel>();
  @Output() markerMouseOut: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() mapClickedEmiter: EventEmitter<{ lat: number, lang: number }> = new EventEmitter<{ lat: number, lang: number }>();

  markers: any;
  circles: any;

  @Input()
  category: Category | null = null;

  markerToCreate: any;

  activeUserLocation: { lat: number, lng: number } | undefined;

  @Input()
  distance: number | null = null;

  ngAfterViewInit(): void {
    this.getMapCenter();
  }

  ngOnChanges() {

    if (this.map) {
      this.removeMarkers();
      this.prepareEventMarkers();
    }
  }

  private fitBoundsMarkers() {
    if (this.markers) {

      if (this.markers && this.markers.getLayers() && this.markers.getLayers().length > 1) {
        const featureGroup = L.featureGroup(this.markers.getLayers());
        this.map.fitBounds(featureGroup.getBounds(), { padding: [50, 50], maxZoom: 17 });
      }

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
      this.circles = L.layerGroup();
      this.markerToCreate = L.layerGroup();

      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        this.activeUserLocation = { lat: latitude, lng: longitude };

        this.map = L.map('map', {
          center: new LatLng(latitude, longitude),
          zoom: 5,
          layers: [this.markers, this.markerToCreate, this.circles]
        });

        this.initMap();

      }, () => {

        this.map = L.map('map', {
          center: new LatLng(latitude, longitude),
          zoom: 5,
          layers: [this.markers, this.markerToCreate, this.circles]
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

  private drawActiveUserDistanceCircle(lat: number, lng: number) {

    if (this.circles) {
      this.circles.clearLayers();
    }

    if (this.distance && this.distance != 0) {

      const distance = this.distance * 1000;

      var circle = L.circle([lat, lng], {
        color: 'white',
        fillColor: '#fff',
        fillOpacity: 0.4,
        radius: distance
      }).addTo(this.circles);

    }

  }

  private prepareEventMarkers() {

    this.markers.clearLayers()
    this.addActiveUserLocation();

    if (this.activeUserLocation) {
      this.drawActiveUserDistanceCircle(this.activeUserLocation.lat, this.activeUserLocation.lng);
    }

    this.events.forEach((event) => {

      const eventCategory = event.categories && event.categories.length > 0
        ? event.categories[0].icon
        : "default";

      const iconUrl = this.getIconUrl(eventCategory);

      const markerIcon = L.icon({
        iconUrl: `assets/markers/${iconUrl}`,
        iconSize: [30, 30],
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

    this.fitBoundsMarkers();

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

  private addActiveUserLocation() {
    const markerIcon = L.icon({
      iconUrl: `assets/markers/location-pin.png`,
      iconSize: [30, 30],
    });

    if (this.activeUserLocation) {
      const marker = L.marker([this.activeUserLocation.lat, this.activeUserLocation.lng], { icon: markerIcon, zIndexOffset: 1000 },).addTo(this.markers);

      const popup = L.popup();

      marker.on('mouseover', (e: any) => {
        popup
          .setLatLng(e.latlng)
          .setContent("¡This is your active location!")
          .openOn(this.map);

        // this.map.panTo(new L.LatLng(40.737, -73.923));
        // this.map.setView(new L.LatLng(40.737, -73.923), 8);

      });

      marker.on('mouseout', (e: any) => {
        popup
          .close();
      });
    }

  }


  async handleClickMarker(event: any) {
    // this.map.setView(new L.LatLng(event.latitude, event.longitude), 8, { animation: true });
    this.markerClick.emit(event);
  }

  async handleClickMarkerOut(event: any) {
    this.markerMouseOut.emit(true);
  }

  async handleClickMarkerOver(event: any) {
    this.markerMouseOn.emit(event);
  }

  async handleClickMapClicked(latLang: any) {
    if (this.isCreateFormEvent && latLang && latLang.lat && latLang.lng) {

      this.markerToCreate.clearLayers()
      this.markers.clearLayers()

      this.addActiveUserLocation();

      let iconUrl = this.getIconUrl("default");

      if (this.category?.icon) {
        iconUrl = this.getIconUrl(this.category.icon);
      }

      const markerIcon = L.icon({
        iconUrl: `assets/markers/${iconUrl}`,
        iconSize: [30, 30],
      });

      const marker = L.marker([latLang.lat, latLang.lng], { icon: markerIcon }).addTo(this.markerToCreate);
      this.mapClickedEmiter.emit({ lat: latLang.lat, lang: latLang.lng });
    }
  }

} 