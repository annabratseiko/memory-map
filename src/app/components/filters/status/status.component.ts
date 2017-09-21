import { Component, OnInit, Input } from '@angular/core';
import { FiltersService } from "../../../shared/services/filters.service";
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Input() filter: any;
  public activeItem: string = '';

  constructor(
    private _filterService: FiltersService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    console.log('f-st', this.filter);
  }

  changeFilter(param: number) {
    this._filterService.changeFilter(param, 'status');
    this.loaderService.loadComplete(false, 'map');
    this.activeItem = param === 0 ? 'military' : 'civil';
  }

  resetFilter() {
    this._filterService.changeFilter(null, 'status');
    this.loaderService.loadComplete(false, 'map');
    this.activeItem = '';
  }

}
