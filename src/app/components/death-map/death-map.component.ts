import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../shared/services/data.service";
import { styles } from "../../shared/const/map-style";

@Component({
  selector: 'app-death-map',
  templateUrl: './death-map.component.html',
  styleUrls: ['./death-map.component.css'],
  providers: [DataService]
})
export class DeathMapComponent implements OnInit {
  public zoom: number = 5;
  public centerLat: number = 50.4016991;
  public centerLng: number = 30.252514;
  public mapStyle = styles;
  public citiesKeys: any;
  public markers: any[] = [];
  private _cities: any;
  

  @Input('cities') set cities(value: any) {
    if (value) {
      let obj = JSON.parse(JSON.stringify(value));
      this._cities = obj.cities;  
      this.citiesKeys = Object.keys(this._cities);
      console.log(this.cities["1"]);
      this.pushMarkers();
    } else {
      this._cities = null;
    }
  }

  get cities(): any {
    return this._cities;
  }
  
  constructor() { }

  ngOnInit() {
  }

  pushMarkers(){
    this.citiesKeys.forEach(element => {
      if(+this.cities[element].deathCount > 0) {
        this.markers.push({
          lat: Number(this.cities[element].coords.lat),
          lng: Number(this.cities[element].coords.lng),
          draggable: false
        })
      }
    });

    console.log(this.markers);
  }

  clickedMarker(city: any, type: number) {
    this.centerLat = city.lat;
    this.centerLng = city.lng;
    this.zoom = 8;
    console.log(type);
  }
}
