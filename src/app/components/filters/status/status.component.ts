import { Component, OnInit, Input } from '@angular/core';
import { FiltersService } from "../../../shared/services/filters.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() filter: any;
  constructor(
    private _filterService: FiltersService
  ) { }

  ngOnInit() {
    console.log('f-st', this.filter);
  }

  changeFilter(param: number) {
    this._filterService.changeFilter(param, 'status');
  }

  resetFilter() {
    this._filterService.changeFilter(null, 'status');
  }

}
