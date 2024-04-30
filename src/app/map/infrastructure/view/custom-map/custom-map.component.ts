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


  private printBounds() {

    var bounds = this.map.getBounds();

    var northWest = bounds.getNorthWest(),
      northEast = bounds.getNorthEast(),
      southWest = bounds.getSouthWest(),
      southEast = bounds.getSouthEast();
    console.log(JSON.stringify(northEast), JSON.stringify(northWest), JSON.stringify(southEast), JSON.stringify(southWest));


  }
  private initMap(): void {

    this.initMapConfiguration();
    this.initMarkers();

    this.printBounds();

    const popup = L.popup();

    this.map.on('click', (e: any) => {
      this.printBounds();

      var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
      }).addTo(this.map);

      console.log(circle.getRadius());
      console.log(circle.getBounds());
      console.log(circle.getLatLng());

      const c = circle.getLatLng();
      const ev = e.latlng;

      var d = this.map.distance(ev, c)

      console.log("Distance" + d);

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



// This funciton should MARK, or select the values that are inside the circle.
// reference: https://www.gistechsolutions.com/leaflet/DEMO/baseball/BaseballPanelSelect2.html
// function SelectPoints(lat: number ,lon:number ){
// 	// var dist = document.getElementById("miles").value; // distancia
// 	var dist = 500; // distancia en metros



// 	const xy = [lat,lon];  //center point of circle
	
// 	var theRadius = dist * 0.5 //1609.34 meters in a mile 
// 	//dist is a string so it's convered to an Interger.
	
// 	selPts.length =0;  // This are the points that are inside the circle
	
// 	bbTeam.eachLayer(function (layer) {

// 		// Lat, long of current point as it loops through.
// 		layer_lat_long = layer.getLatLng();
		
// 		// Distance from our circle marker To current point in meters
// 		distance_from_centerPoint = layer_lat_long.distanceTo(xy);
		
// 		// See if meters is within radius, add the to array
// 		if (distance_from_centerPoint <= theRadius) {
// 			 selPts.push(layer.feature);  
// 		}
// 	});

// 	// draw circle to see the selection area
// 	theCircle = L.circle(xy, theRadius , {   /// Number is in Meters
// 	  color: 'orange',
// 	  fillOpacity: 0,
// 	  opacity: 1
// 	}).addTo(map);
	
// 	//Symbolize the Selected Points
// 		 geojsonLayer = L.geoJson(selPts, {
		 
// 			pointToLayer: function(feature, latlng) {
// 				return L.circleMarker(latlng, {
// 				radius: 4, //expressed in pixels circle size
// 				color: "green", 
// 				stroke: true,
// 				weight: 7,		//outline width  increased width to look like a filled circle.
// 				fillOpcaity: 1
// 				});
// 				}
// 		});
// 		//Add selected points back into map as green circles.
// 		map.addLayer(geojsonLayer);
		
// 		//Take array of features and make a GeoJSON feature collection 
// 		var GeoJS = { type: "FeatureCollection",  features: selPts   };
		
// 		//Show number of selected features.
// 		console.log(GeoJS.features.length +" Selected features");
		
// 		 // show selected GEOJSON data in console
// 		console.log(JSON.stringify(GeoJS));
	
// 	//////////////////////////////////////////

// 		/// Putting the selected team name in the table
	
// 		//Clean up prior records
// 		$("#myTable tr").remove(); 
		
// 		var table = document.getElementById("myTable");
// 		 //Add the header row.
// 		var row = table.insertRow(-1);
//         var headerCell = document.createElement("th");
//         headerCell.innerHTML = "Team";  //Fieldname
//         row.appendChild(headerCell);
		
// 	    //Add the data rows. 
// 		//console.log(selPts);		
// 		for (var i = 0; i < selPts.length; i++) {
// 			//console.log(selPts[i].properties.Team);
// 			row = table.insertRow(-1);
        
//            var cell = row.insertCell(-1);
//             cell.innerHTML = selPts[i].properties.Team;
// 		}
// 		  //Get the Team name in the cell.
// 		 $('#myTable tr').click(function(x) {
// 			theTeam = (this.getElementsByTagName("td").item(0)).innerHTML;
// 			console.log(theTeam);
// 			map._layers[theTeam].fire('click');
// 			var coords = map._layers[theTeam]._latlng;
// 			console.log(coords);
// 			map.setView(coords, 12);
// 		 });
		

// };	//end of SelectPoints function
