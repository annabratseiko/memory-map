import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from "../../shared/services/data.service";
import { FiltersService } from "../../shared/services/filters.service";
import { FilterModel } from "../../shared/const/filter.model";
import { LoaderService } from '../../shared/services/loader.service';
import { LoaderModel } from '../../shared/const/loader.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [DataService]
})
export class ListComponent implements OnInit, OnDestroy {
  public list: any;
  public listKeys: any;
  public currentPage: number = 1;
  public personDetails: any = null;
  public showPopup: boolean = false;
  public filtersData: any;
  public countriesKeys: any;
  public ageKeys: any;
  public loaders: LoaderModel;
  public filters: FilterModel;
  public activeStatus: string = '';
  public activeSex: string = '';
  public firstDate = new Date(2014, 0);
  public dateFilter = [null, null];
  public ageFilter = [null, null];

  private subscription: Subscription;
  private loadSubscription: Subscription;

  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private _filterService: FiltersService,
    private loaderService: LoaderService
) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.loaderService.routeChange('list');
    this.filters = new FilterModel();
    this.loaders = new LoaderModel();
    
    this.loadSubscription = this.loaderService.showLoader$.subscribe(loaders => {
      this.loaders = loaders;
      console.log(this.loaders);
    });
    this.route.params.subscribe((params: Params) => {
      this.currentPage = +params["page"];
      this.getData();    
    });
    this.getFilters();
    this.subscription = this._filterService.filterChoosen$.subscribe(filters => {
      this.filters = filters;
      if (filters.query) {
        this.list = null; 
        console.log('search list');
        this.getData();
      }
    });
  }

  getData() {
    this._dataService.getList(this.currentPage, this.filters.age, this.filters.country, this.filters.date, this.filters.sex, this.filters.status, this.filters.query).subscribe(res => {
      this.list = JSON.parse(JSON.stringify(res)).main;
      this.listKeys = Object.keys(this.list);
      this.loaderService.loadComplete(true, 'list');
      console.log('list', this.list);
    });   
  }

  getFilters() {
      this._dataService.getFilters().subscribe(res => {
        this.filtersData = JSON.parse(JSON.stringify(res));
        this.countriesKeys = Object.keys(this.filtersData.countries);
        this.ageKeys = Object.keys(this.filtersData.age);
      });
  }

  goToPage(page) {
    this.list = null; 
    if (page > 0) {
      this.router.navigate(['/list', page]);
    }
  }

  getDetailInfo(id: any) {
    console.log(id);
    this._dataService.getPersonDetail(id).subscribe(res => {
      let card = JSON.parse(JSON.stringify(res)).main;
      this.personDetails = {
        name: card.fullName,
        birthCity: card.birthCityName,
        deathCity: card.deathCityName,
        birthDate: card.birthDate,
        deathDate: card.deathDate,
        description: card.description,
        position: card.position,
        status: card.status,
        rank: card.rank
      }
      this.showPopup = true;
      console.log('get one detail', res);
    });
  }

  chooseFilter(type: string, value: any) {
    switch(type) {
      case 'status': {
        this.activeStatus = value === 0 ? 'military' : 'civil';
        this._filterService.changeFilter(value.toString(), type);
        break;
      }
      case 'sex': {
        this.activeSex = value === 0 ? 'male' : 'female';
        this._filterService.changeFilter(value.toString(), type);
        break;
      }
    }
  }

  chooseCountry(event) {
    this._filterService.changeFilter(event.toString(), 'country');
  }

  selectAge(event, type) {
    if (type === 'start') {
      this.ageFilter[0] = event;
    } else if (type === 'end') {
      this.ageFilter[1] = event;
    }
    this._filterService.changeFilter(this.ageFilter, 'age');
  }

  onSelectDate(event, type) {
    let date = new Date(event);
    let fullDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    if (type === 'start') {
      this.dateFilter[0] = fullDate;
    } else if (type === 'end') {
      this.dateFilter[1] = fullDate;
    }
    this._filterService.changeFilter(this.dateFilter, 'date');
  }

  resetFilters() {
    this._filterService.changeFilter(null, 'date');
    this.dateFilter = [null, null];
    this._filterService.changeFilter(null, 'age');
    this.ageFilter = [null, null];
    this._filterService.changeFilter(null, 'status');
    this.activeStatus = '';
    this._filterService.changeFilter(null, 'sex');
    this.activeSex = '';
    this._filterService.changeFilter(null, 'country');
    
    this.getData();
  }

  setFilters() {
    this.getData();
  }

  closePopup(event) {
    this.showPopup = event;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.loadSubscription.unsubscribe();
  }

}
