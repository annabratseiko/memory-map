import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { FiltersService } from '../../shared/services/filters.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DataService]
})
export class HeaderComponent implements OnInit {
  public showMobMenu: boolean = false;
  public searchQuery: string = '';
  public currentLang: string = 'ua';
  public searchCities: any;
  public searchCitiesKeys: any[] = [];
  public searchPersons: any;
  public searchPersonsKeys: any[] = [];
  public endSearch: boolean = false;
  public hideResult: boolean = true;
  public location: string = '';
  public showPopup: boolean = false;
  public popupInfo: any;
  public openContact: boolean = false;
  public mobSearch: boolean = false;

  private subscription: Subscription;
  private urlSubscription: Subscription;
  
  constructor(
    private translate: TranslateService,
    private _dataService: DataService,
    private _filterService: FiltersService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.urlSubscription = this.loaderService.changeRoute$.subscribe(param => {
      this.location = param;
    });

    this.subscription = this._filterService.filterChoosen$.subscribe(filters => {
      console.log('filHE', filters);
    });
  }

  mobMenuAction() {
    this.showMobMenu = !this.showMobMenu;
  }

  setLanguage(event) {
    this.translate.use(event.target.value);
  } 

  changeLang(event, lang: string) {
    event.preventDefault();
    this.translate.use(lang);
    this.currentLang = lang;
  }

  closePopup(event) {
    this.showPopup = event;
  }

  getDetailInfo(event) {
    this.showPopup = true;
    this.popupInfo = event;
    this.searchQuery = '';
  }

  startSearch(event?) {
    if(this.searchQuery === '') {
      this.hideResult = true;
      return;
    }
    
    if(event && event.keyCode !== 13) {
      return;
    }

    if (this.location === 'list') {
      this._filterService.changeFilter(this.searchQuery, 'query');
    } else if (this.location === 'map') {
      this.hideResult = false;
      this.searchCitiesKeys = [];
      this.searchPersonsKeys = [];
      this.endSearch = false;
  
      this._dataService.search(this.searchQuery).subscribe(res => {
        this.endSearch = true;
        this.searchCities = JSON.parse(JSON.stringify(res)).cities;
        this.searchCitiesKeys = Object.keys(this.searchCities);
        this.searchPersons = JSON.parse(JSON.stringify(res)).main;
        this.searchPersonsKeys = Object.keys(this.searchPersons);
      });
    }
  }

  openContactPopup(event) {
    this.openContact = event;
  }

  openMobileSearch(event) {
    this.mobSearch = event;
  }


}
