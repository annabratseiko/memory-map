import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from "../../shared/services/data.service";
import { styles } from "../../shared/const/map-style";
import { FiltersService } from "../../shared/services/filters.service";
import { FilterModel } from "../../shared/const/filter.model";
import { MapService } from '../../shared/services/map.service';
import { GoogleMapsAPIWrapper, MarkerManager, AgmMarker } from '@agm/core';
import { } from 'googlemaps';
import { Marker } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-birth-map',
  templateUrl: './birth-map.component.html',
  styleUrls: ['./birth-map.component.css'],
  providers: [DataService, GoogleMapsAPIWrapper, MarkerManager]
})
export class BirthMapComponent implements OnInit, OnDestroy {
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
  public showOverlay: boolean = false;
  
  private _cities: any;
  private subscription: Subscription;
  private centerSubscription: Subscription;

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

  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.showOverlay = false;
  }
  
  constructor(
    private _dataService: DataService,
    private _filterService: FiltersService,
    private mapService: MapService,
    private gm: MarkerManager
  ) { 
  }

  ngOnInit() {
    this.filter = new FilterModel();
    this.subscription = this._filterService.filterChoosen$.subscribe(filters => {
      this.filter = filters;
    });
    this.centerSubscription = this.mapService.setBirthCenter$.subscribe(center => {
      this.centerLat = +center.lat;
      this.centerLng = +center.lng;
      this.zoom = 8; 
      this.showOverlay = true;     
    });

  }

  pushMarkers(){
    this.markers = [];
    this.citiesKeys.forEach(element => {
      if(+this.cities[element].bornCount > 0) {
        // let marker = new google.maps.Marker({
        //   position: {lat: +this.cities[element].coords.lat, lng: +this.cities[element].coords.lng},
        //   // map: feature.map,
        //   // icon: markerIcon,
        //   // id: element,
        //   draggable: false
        // });
        // let mOptions = {
        //     id: element,
        //     position: {lat: +this.cities[element].coords.lat, lng: +this.cities[element].coords.lng},
        //     draggable: false,
        //     clickable: true,
        //     cityName: this.cities[element].cityName
        // };

        this.markers.push({
          id: element,
          lat: Number(this.cities[element].coords.lat),
          lng: Number(this.cities[element].coords.lng),
          draggable: false,
          cityName: this.cities[element].cityName
        });
      }
    });
    // setTimeout(_=> {
    //   console.log('marker-click', this.markers[0]);
    //   this.gm.createEventObservable('click', this.markers[0]);
    //   new google.maps.event.trigger(this.markers[0], 'click');
    // }, 5000);
  }

  clickedMarker(city: any, type: number) {
    this.listKeys = [];
    this.cardInfo = null;
    this.centerLat = +city.lat;
    this.centerLng = +city.lng;
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
      };
      this.mapService.changeDeathFilter(card.deathCityCoords);
    });
  }

  getDetailInfo(id: any) {
    this._dataService.getPersonDetail(id).subscribe(res => {
      let card = JSON.parse(JSON.stringify(res)).main;
      console.log('iiii', card);
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

  closeInfo() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.centerSubscription.unsubscribe();
  }
  

}
