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
  public loaders: LoaderModel;
  
  public filters: FilterModel;
  public activeStatus: string = '';
  public activeSex: string = '';

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
    let localFilters = localStorage.getItem('filters');
    if (!localFilters) {
      this._dataService.getFilters().subscribe(res => {
        this.filtersData = JSON.parse(JSON.stringify(res));
        localStorage.setItem('filters', JSON.stringify(this.filters));
      });
    } else {
      this.filtersData = JSON.parse(localFilters);
    }
    this.countriesKeys = Object.keys(this.filtersData.countries);
    console.log(this.filtersData);
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

  resetFilters() {
    this._filterService.changeFilter(null, 'status');
    this.activeStatus = '';
    this._filterService.changeFilter(null, 'sex');
    this.activeSex = '';
    this._filterService.changeFilter(null, 'country');
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
