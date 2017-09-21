import { Component, OnInit, Input, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FiltersService } from "../../../shared/services/filters.service";
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.css']
})
export class AgeComponent implements OnInit, AfterViewInit {
  private _filter: any;
  private _initRange: any[] = [];

  @ViewChild('container') container: ElementRef;
  @ViewChild('sliderRef') sliderRef;
  
  public ageArray: any[];
  public range: any = [18, 60];
  public startAge: number;
  public endAge: number;
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
    private _filterService: FiltersService,
    private loaderService: LoaderService
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

  ngAfterViewInit() {
    setTimeout(_ => {
      this.startAge = +this.ageArray[0];
      this.endAge = +this.ageArray[this.ageArray.length - 1];
      this.sliderRef.slider.updateOptions({
        range: {
          min: this.startAge,
          max: this.endAge
        },
      })
      this.range = [this.startAge, this.endAge];
      this._initRange = [+this.ageArray[0], +this.ageArray[this.ageArray.length - 1]];
    });
  }

  onChange(event) {
    this.loaderService.loadComplete(false, 'map');
    if(event[0] == this._initRange[0] && event[1] == this._initRange[1]) {
      this._filterService.changeFilter(null, 'age');
    } else {
      this._filterService.changeFilter(event, 'age');
    }
  }

  resetFilter() {
    this.range = this._initRange;
    // this.loaderService.loadComplete(false, 'map');
  }

}
