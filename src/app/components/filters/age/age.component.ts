import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FiltersService } from "../../../shared/services/filters.service";

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.css']
})
export class AgeComponent implements OnInit {
  private _filter: any;

  @ViewChild('container') container: ElementRef;
  
  public ageArray: any[];
  public range: any = [18, 60];
  public configs = {
      connect: true,
      range: {
        min: 18,
        max: 60
      },
      step: 1
  };
  
  @Input('filter') set filter(value: any) {
    if (value) {
      this._filter = value;  
      this.ageArray = Object.keys(value);
    } else {
      this._filter = null;
    }
  }

  get filter(): any {
    return this._filter;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _filterService: FiltersService
  ) { }

  buildGraph() {
    let max = 0;
    this.ageArray.forEach(element => {
      max = Math.max(max, this.filter[element]);
    });

    this.ageArray.forEach(element => {
      let item = document.createElement('div');
	    item.className = 'graph-item';
	    item.style.height = (this.filter[element] / max) * 100 + '%';
	    this.container.nativeElement.appendChild(item);
    });
  }

  ngOnInit() {
    this.buildGraph();
  }

  onChange(event) {
    this._filterService.changeFilter(event, 'age');
  }

  resetFilter() {
    this._filterService.changeFilter(null, 'age');
  }

}
