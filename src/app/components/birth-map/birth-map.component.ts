import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../shared/services/data.service";
import { styles } from "../../shared/const/map-style";
// import { marker } from '../../shared/const/marker';

@Component({
  selector: 'app-birth-map',
  templateUrl: './birth-map.component.html',
  styleUrls: ['./birth-map.component.css'],
  providers: [DataService]
})
export class BirthMapComponent implements OnInit {
  public zoom: number = 5;
  public centerLat: number = 50.4016991;
  public centerLng: number = 30.252514;
  public mapStyle = styles;
  public citiesKeys: any;
  public markers: any[] = [];
  public showList: boolean = true;
  public list: any;
  public listKeys: any;
  public cardInfo: any = null;

  private _cities: any;

  @Input('cities') set cities(value: any) {
    if (value) {
      let obj = JSON.parse(JSON.stringify(value));
      this._cities = obj.cities;  
      this.citiesKeys = Object.keys(this._cities);
      this.pushMarkers();
    } else {
      this._cities = null;
    }
  }

  get cities(): any {
    return this._cities;
  }
  
  constructor(private _dataService: DataService) { }

  ngOnInit() {
  }

  pushMarkers(){
    this.citiesKeys.forEach(element => {
      if(+this.cities[element].bornCount > 0) {
        this.markers.push({
          id: element,
          lat: Number(this.cities[element].coords.lat),
          lng: Number(this.cities[element].coords.lng),
          draggable: false
        })
      }
    });

    console.log(this.markers);
  }

  clickedMarker(city: any, type: number) {
    this.showList = true;
    this.listKeys = [];
    this.cardInfo = null;
    this.centerLat = city.lat;
    this.centerLng = city.lng;
    this.zoom = 8;

    this._dataService.getPersonListCity(city.id, type).subscribe(res => {
      console.log('get list', res);
      this.list = JSON.parse(JSON.stringify(res)).main;
      this.listKeys = Object.keys(this.list);

      this.showList = !(this.listKeys.length === 1);
      
      if (!this.showList) {
        this.showCard(this.listKeys[0]);
      }
    });
  }

  showCard(id: any) {
    this.showList = false;
    this._dataService.getPersonShort(id).subscribe(res => {
      let card = JSON.parse(JSON.stringify(res)).main;
      this.cardInfo = {
        name: card.fullName,
        photo: card.photo,
        description: card.description,
        birth: card.birthCityName,
        status: card.status
      }
      console.log('get one', res);
    });
  }
  

}
