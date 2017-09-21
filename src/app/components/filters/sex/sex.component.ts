import { Component, OnInit, Input } from '@angular/core';
import { FiltersService } from "../../../shared/services/filters.service";
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-sex',
  templateUrl: './sex.component.html',
  styleUrls: ['./sex.component.css']
})
export class SexComponent implements OnInit {
  @Input() filter: any;
  public activeItem: string = '';

  constructor(
    private _filterService: FiltersService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    console.log('f-sex', this.filter);
  }

  changeFilter(param: number) {
    this._filterService.changeFilter(param, 'sex');
    this.loaderService.loadComplete(false, 'map');
    this.activeItem = param === 0 ? 'male' : 'female';
  }

  resetFilter() {
    this._filterService.changeFilter(null, 'sex');
    this.loaderService.loadComplete(false, 'map');
    this.activeItem = '';
  }

}
