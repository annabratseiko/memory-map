import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from "../../shared/services/data.service";
import { styles } from "../../shared/const/map-style";
import { FiltersService } from "../../shared/services/filters.service";
import { FilterModel } from "../../shared/const/filter.model";

@Component({
  selector: 'app-death-map',
  templateUrl: './death-map.component.html',
  styleUrls: ['./death-map.component.css'],
  providers: [DataService]
})
export class DeathMapComponent implements OnInit, OnDestroy {
  public zoom: number = 5;
  public centerLat: number = 50.4016991;
  public centerLng: number = 30.252514;
  public mapStyle = styles;
  public citiesKeys: any;
  public markers: any[] = [];
  public showList: boolean = false;
  public list: any;
  public listKeys: any;
  public cardInfo: any = null;
  public filter: FilterModel;
  
  private _cities: any;
  private subscription: Subscription;

  @Output() detailInfo: EventEmitter<any> = new EventEmitter();

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
  
  constructor(
    private _dataService: DataService,
    private _filterService: FiltersService
  ) { }

  ngOnInit() {
    this.filter = new FilterModel();
    this.subscription = this._filterService.filterChoosen$.subscribe(filters => {
      this.filter = filters;
    });
  }

  pushMarkers(){
    this.markers = [];
    this.citiesKeys.forEach(element => {
      if(+this.cities[element].deathCount > 0) {
        this.markers.push({
          id: element,
          lat: Number(this.cities[element].coords.lat),
          lng: Number(this.cities[element].coords.lng),
          draggable: false,
          cityName: this.cities[element].cityName
        })
      }
    });

    console.log(this.markers);
  }

  clickedMarker(city: any, type: number) {
    this.listKeys = [];
    this.cardInfo = null;
    this.centerLat = city.lat;
    this.centerLng = city.lng;
    this.zoom = 8;

    this._dataService.getPersonListCity(city.id, type, this.filter.age, this.filter.country, this.filter.date, this.filter.sex, this.filter.status).subscribe(res => {
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
    this._dataService.getPersonShort(id, this.filter.age, this.filter.country, this.filter.date, this.filter.sex, this.filter.status).subscribe(res => {
      let card = JSON.parse(JSON.stringify(res)).main;
      this.cardInfo = {
        id: card.id,
        name: card.fullName,
        photo: card.photo,
        description: card.description,
        birth: card.birthCityName,
        status: card.status
      }
    });
  }

  getDetailInfo(id: any) {
    console.log(id);
    this._dataService.getPersonDetail(id).subscribe(res => {
      let card = JSON.parse(JSON.stringify(res)).main;
      let info = {
        name: card.fullName,
        photo: card.photo,
        birthCity: card.birthCityName,
        deathCity: card.deathCityName,
        birthDate: card.birthDate,
        deathDate: card.deathDate,
        description: card.description,
        position: card.position,
        status: card.status,
        rank: card.rank
      }
      this.detailInfo.emit(info);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
