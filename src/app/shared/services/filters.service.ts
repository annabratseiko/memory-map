import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'

@Injectable()
export class FiltersService {
  public filtersScope = {
    age: null,
    date: null,
    country: null,
    status: null,
    sex: null,
    query: null,
    birthCity: null,
    deathCity: null
  };

  private filtersSourse = new Subject<any>();
  private langSourse = new Subject<any>();
  
  filterChoosen$ = this.filtersSourse.asObservable();
  langChoosen$ = this.langSourse.asObservable();
  
  changeFilter(value: any, type: string) {
    switch(type) {
      case 'age': {
        this.filtersScope.age = value;
        break;
      }
      case 'date': {
        this.filtersScope.date = value;
        break;
      }
      case 'country': {
        this.filtersScope.country = value;
        break;
      }
      case 'status': {
        this.filtersScope.status = value;
        break;
      }
      case 'sex': {
        this.filtersScope.sex = value;
        break;
      }
      case 'query': {
        this.filtersScope.query = value;
        break;
      }
      case 'birthCity': {
        this.filtersScope.birthCity = value;
        break;
      }
      case 'deathCity': {
        this.filtersScope.deathCity  = value;
        break;
      }
    }

    this.filtersSourse.next(this.filtersScope);
  }

  changeLanguage(value: string) {
    this.langSourse.next(value);
  }

}
