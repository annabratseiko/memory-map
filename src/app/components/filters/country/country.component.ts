import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FiltersService } from "../../../shared/services/filters.service";
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  private _filter: any;
  
  @ViewChild('container') container: ElementRef;

  public countriesArray: any[];
  private _prevCountry: any = null;

  @Input('filter') set filter(value: any) {
    if (value) {
      this._filter = value;  
      this.countriesArray = Object.keys(value);
      this.updateGraph();
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
    let maxElem = null;
    this.countriesArray.forEach(element => {
      max = Math.max(max, +this.filter[element].birthNumber);
      if (+this.filter[element].birthNumber === max) {
        maxElem = element;
      }
    });

    this.countriesArray.forEach(element => {
      let item = document.createElement('div');
      item.className = 'graph-item-country';
      item.setAttribute('data-name', this.filter[element].countryName);
      item.style.height = '100%';
      item.addEventListener('click', this.selectCountry.bind(this, item, element));
      
      var innerItem = document.createElement('div');
      innerItem.className = 'graph-item-country-inner';
      if (+element == +maxElem) {
        console.log(element, maxElem);
        innerItem.style.height = (+this.filter[element].birthNumber / max) * 100 + '%';
      } else {
        innerItem.style.height = (+this.filter[element].birthNumber / max) * 100 + 10 + '%';
      }
	    item.appendChild(innerItem);
	    
	    var hoverBlock = document.createElement('div');
	    hoverBlock.className = 'graph-item-country-hover';
	    item.appendChild(hoverBlock);

	    this.container.nativeElement.appendChild(item);
    });
  }

  updateGraph() {
    this.removeGraphItems();
    this.buildGraph();
  }

  removeGraphItems() {
    while (this.container.nativeElement.firstChild) {
      this.container.nativeElement.removeChild(this.container.nativeElement.firstChild);
    }
  }

  selectCountry(item, id) {
    if(this._prevCountry) {
      this._prevCountry.classList.remove('active');
    }
    this._filterService.changeFilter(id, 'country');
    this.loaderService.loadComplete(false, 'map');
    item.classList.add('active');
    this._prevCountry = item;
  }

  resetFilter() {
    this._filterService.changeFilter(null, 'country');
    this.loaderService.loadComplete(false, 'map');
    if(this._prevCountry) {
      this._prevCountry.classList.remove('active');
      this._prevCountry = null;
    }
  }

  ngOnInit() {
  }

}
