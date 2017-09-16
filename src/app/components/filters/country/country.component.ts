import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FiltersService } from "../../../shared/services/filters.service";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  private _filter: any;
  
  @ViewChild('container') container: ElementRef;

  public countriesArray: any[];

  @Input('filter') set filter(value: any) {
    if (value) {
      this._filter = value;  
      this.countriesArray = Object.keys(value);
      console.log(this.countriesArray);
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
    this.countriesArray.forEach(element => {
      max = Math.max(max, +this.filter[element].birthNumber);
    });

    this.countriesArray.forEach(element => {
      let item = document.createElement('div');
      item.className = 'graph-item-country';
      item.setAttribute('data-name', this.filter[element].countryName);
      item.style.height = '100%';
      item.addEventListener('click', this.selectCountry.bind(this, element));
      
      var innerItem = document.createElement('div');
	    innerItem.className = 'graph-item-country-inner';
	    innerItem.style.height = (+this.filter[element].birthNumber / max) * 100 + '%';
	    item.appendChild(innerItem);
	    
	    var hoverBlock = document.createElement('div');
	    hoverBlock.className = 'graph-item-country-hover';
	    item.appendChild(hoverBlock);

	    this.container.nativeElement.appendChild(item);
    });
  }

  selectCountry(id) {
    this._filterService.changeFilter(id, 'country');
  }

  resetFilter() {
    this._filterService.changeFilter(null, 'country');
  }

  ngOnInit() {
    this.buildGraph();
  }

}
