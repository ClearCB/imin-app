import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import L, { icon, LatLng } from "leaflet";

@Component({
  selector: 'app-custom-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './custom-map.component.html',
  styleUrl: './custom-map.component.scss'
})
export class CustomMapComponent implements AfterViewInit {

  @Input()
  public markers: L.Marker[] = [];
  private map: any;

  constructor() { }

  ngAfterViewInit(): void {
    // this.initMap();
    this.getMapCenter();
  }

  private getMapCenter() {

    let latitude = 39.0000;
    let longitude = 2.96666;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        this.map = L.map('map', {
          center: new LatLng(latitude, longitude),
          zoom: 5
        });

        this.initMap();

      });
    }
  }

  private initMapConfiguration() {


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 50,
      minZoom: 4,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  }

  private initMarkers() {

    var cafe = L.icon({
      iconUrl: 'assets/markers/cafe.png',
      iconSize: [20, 20], // size of the icon
      iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    });

    var basket = L.icon({
      iconUrl: 'assets/markers/basketball.png',
      iconSize: [20, 20], // size of the icon
      iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    });

    var ifno = L.icon({
      iconUrl: 'assets/markers/information.png',
      iconSize: [20, 20], // size of the icon
      iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    });

    let marker = L.marker([41.5, -0.09], { icon: basket });
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    marker.addTo(this.map);

    const popup = L.popup();

    marker.on('mouseover', (e: any) => {
      popup
        .setLatLng(e.latlng)
        .setContent("You passsed the map at " + e.latlng.toString())
        .openOn(this.map);
    });

    marker = L.marker([31.5, -0.09], { icon: ifno }).addTo(this.map);
    marker.addTo(this.map);

    marker = L.marker([21.5, -0.09], { icon: cafe }).addTo(this.map);
    marker.addTo(this.map);


    this.markers.forEach(marker => {
      marker.addTo(this.map);
    })

  }


  public onMapClick(e: any) {

  }


  private initMap(): void {

    this.initMapConfiguration();
    this.initMarkers();

    const popup = L.popup();

    this.map.on('click', (e: any) => {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map);
    });



    var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
      denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
      aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
      golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');


    var cities = L.layerGroup([littleton, denver, aurora, golden]);


    var layerControl = L.control.layers().addTo(this.map);

    var crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.'),
      rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');

    var parks = L.layerGroup([crownHill, rubyHill]);

    layerControl.addOverlay(parks, "Parks");
    var ifno = L.icon({
      iconUrl: 'assets/markers/library.png',
      iconSize: [20, 20], // size of the icon
      iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    });


    var m1 = L.marker([21.5, -0.09], { icon: ifno }),
      m2 = L.marker([20.5, -0.09], { icon: ifno }),
      m3 = L.marker([19.5, -0.09], { icon: ifno }),
      m4 = L.marker([18.5, -0.09], { icon: ifno });


    const library = L.layerGroup([m1, m2, m3, m4]);
    layerControl.addOverlay(library, "Library");
    L.control.scale().addTo(this.map);

  }
} 
