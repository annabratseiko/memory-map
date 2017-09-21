import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from "../../shared/services/data.service";
import { FiltersService } from "../../shared/services/filters.service";

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

  private subscription: Subscription;

  constructor(
    private _dataService: DataService,
    private _filterService: FiltersService
  ) { }

  ngOnInit() {
    this.subscription = this._filterService.filterChoosen$.subscribe(filters => {
      this._dataService.getCities(filters.age, filters.date, filters.country, filters.status, filters.sex, filters.query).subscribe(res => {
        this.cities = res;
      });
    });
    this._dataService.getCities().subscribe(res => {
      this.cities = res;
    });

    this.getFilters();    
  }

  getFilters() {
    let localFilters = localStorage.getItem('filters');
    if (!localFilters) {
      this._dataService.getFilters().subscribe(res => {
        this.filters = JSON.parse(JSON.stringify(res));
        localStorage.setItem('filters', JSON.stringify(this.filters));
      });
    } else {
      this.filters = JSON.parse(localFilters);
    }
  }

  getDetailInfo(event) {
    this.showPopup = true;
    this.personDetails = event;
  }

  closePopup(event) {
    this.showPopup = event;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
