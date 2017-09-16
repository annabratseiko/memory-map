import { Component, OnInit, Input } from '@angular/core';
import { FiltersService } from "../../../shared/services/filters.service";

@Component({
  selector: 'app-sex',
  templateUrl: './sex.component.html',
  styleUrls: ['./sex.component.css']
})
export class SexComponent implements OnInit {
  @Input() filter: any;
  constructor(
    private _filterService: FiltersService
  ) { }

  ngOnInit() {
    console.log('f-sex', this.filter);
  }

  changeFilter(param: number) {
    this._filterService.changeFilter(param, 'sex');
  }

  resetFilter() {
    this._filterService.changeFilter(null, 'sex');
  }

}
