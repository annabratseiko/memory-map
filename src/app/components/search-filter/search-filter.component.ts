import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from "../../shared/services/data.service";
import { FiltersService } from "../../shared/services/filters.service";
import { FilterModel } from "../../shared/const/filter.model";

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {
  @Input() type: string = '';
  @Input() hideSearchButton: boolean = false;
  public searchQuery: string = '';
  public hideResult: boolean = true;
  public endSearch: boolean = false;
  public array: any = [];
  public arrayKeys: any = [];
  @Input() set reset (val: boolean) {
    if (val) {
      this.searchQuery = '';
    }
  }

  constructor(
    private _dataService: DataService,
    private _filterService: FiltersService
  ) { }

  ngOnInit() {
  }

  startSearch(event) {
    let param: number;
    if( this.type === 'birth') {
      param = 0;
    } else if (this.type === 'death') {
      param = 1;
    }
    if(this.searchQuery === '') {
      this.hideResult = true;
      return;
    }

    if(event && event.keyCode !== 13) {
      return;
    }

    if(this.type === 'unit' || this.type === 'callout') {
      return;
    }

    this.hideResult = false;
    this.endSearch = false;
    this.arrayKeys = [];
    
    if(this.type === 'birth' || this.type === 'death') {
      this._dataService.searchCities(this.searchQuery, param).subscribe(res => {
        this.endSearch = true;
        this.array = JSON.parse(JSON.stringify(res)).cities;
        this.arrayKeys = Object.keys(this.array);
      });
    }
  }

  onBlur() {
    if(this.type === 'unit') {
      console.log(this.searchQuery);
      this._filterService.changeFilter(this.searchQuery, 'unit');
      return;
    }

    if(this.type === 'callout') {
      console.log(this.searchQuery);
      this._filterService.changeFilter(this.searchQuery, 'callout');
      return;
    }
  }

  chooseItem(id: number, name: string) {
    this.searchQuery = name;
    this.hideResult = true;
    if (this.type === 'birth') {
      this._filterService.changeFilter(id, 'birthCity');
    } else if (this.type === 'death') {
      this._filterService.changeFilter(id, 'deathCity');
    }  
  }

}
