import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

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
  constructor() { }

  ngOnInit() {
    console.log('f-coun', this.filter);
  }

}
