import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from "../../shared/services/data.service";
import { FiltersService } from "../../shared/services/filters.service";
import { LoaderService } from '../../shared/services/loader.service';
import { LoaderModel } from '../../shared/const/loader.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DataService]
})
export class MainComponent implements OnInit, OnDestroy {
  public cities: any;
  public filters: any;
  public personDetails: any = null;
  public showPopup: boolean = false;
  public openContact: boolean = false;
  public loaders: LoaderModel;

  private subscription: Subscription;
  private loadSubscription: Subscription;
  private langSubscription: Subscription;

  constructor(
    private _dataService: DataService,
    private _filterService: FiltersService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loaders = new LoaderModel();
    this.loaderService.routeChange('map');
    this.loadSubscription = this.loaderService.showLoader$.subscribe(loaders => {
      this.loaders = loaders;
    });

    this.subscription = this._filterService.filterChoosen$.subscribe(filters => {
      this._dataService.getCities(filters.age, filters.date, filters.country, filters.status, filters.sex).subscribe(res => {
        this.cities = res;
        this.loaderService.loadComplete(true, 'map');
      });
    });

    this.langSubscription = this._filterService.langChoosen$.subscribe(lang => {
      this.getFilters();
    });

    this._dataService.getCities().subscribe(res => {
      this.cities = res;
      this.loaderService.loadComplete(true, 'map');
    });

    this.getFilters();    
  }

  getFilters() {
    this._dataService.getFilters().subscribe(res => {
      this.filters = JSON.parse(JSON.stringify(res));
      this.loaderService.loadComplete(true, 'filters');
    });
  }

  getDetailInfo(event) {
    this.showPopup = true;
    this.personDetails = event;
  }

  closePopup(event) {
    this.showPopup = event;
  }

  openContactPopup(event) {
    this.openContact = event;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.loadSubscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }

}
