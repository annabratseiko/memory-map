import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class DataService {

  constructor(
    private http: Http
  ) { }

  public getCities(age?, date?, country?, status?, sex?, query?) : Observable<any> {
    let ageStr = age ? `&start_age=${age[0]}&end_age=${age[1]}` : '';
    let dateStr = date ? `&start_death_date=${date[0]}&end_death_date=${date[1]}` : '';
    let countryStr = country ? `&country_id=${country}` : '';
    let statusStr = status ? `&status=${status}` : '';
    let sexStr = sex ? `&gender=${sex}` : '';
    let querySrt = query ? `&query=${query}` : '';
    return this.http.get(`${CONFIG.API}/cities?lang=uk${ageStr}${dateStr}${countryStr}${statusStr}${sexStr}${querySrt}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getFilters() : Observable<any> {
    return this.http.get(`${CONFIG.API}/filters`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getPersonListCity(id, type, age?, country?, date?, sex?, status?) : Observable<any> {
    let ageStr = age ? `&start_age=${age[0]}&end_age=${age[1]}` : '';
    let dateStr = date ? `&start_death_date=${date[0]}&end_death_date=${date[1]}` : '';
    let countryStr = country ? `&country_id=${country}` : '';
    let statusStr = status ? `&status=${status}` : '';
    let sexStr = sex ? `&gender=${sex}` : '';
    return this.http.get(`${CONFIG.API}/person_list_city?city_id=${id}&city_type=${type}&lang=uk${ageStr}${dateStr}${countryStr}${statusStr}${sexStr}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getPersonShort(id, age?, country?, date?, sex?, status?) : Observable<any> {
    let ageStr = age ? `&start_age=${age[0]}&end_age=${age[1]}` : '';
    let dateStr = date ? `&start_death_date=${date[0]}&end_death_date=${date[1]}` : '';
    let countryStr = country ? `&country_id=${country}` : '';
    let statusStr = status ? `&status=${status}` : '';
    let sexStr = sex ? `&gender=${sex}` : '';
    return this.http.get(`${CONFIG.API}/person_short?person_id=${id}&lang=uk${ageStr}${dateStr}${countryStr}${statusStr}${sexStr}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getPersonDetail(id) : Observable<any> {
    return this.http.get(`${CONFIG.API}/person_detail?person_id=${id}&lang=uk`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getList(page, age?, country?, date?, sex?, status?, query?) : Observable<any> {
    let ageStr = age ? `&start_age=${age[0]}&end_age=${age[1]}` : '';
    let dateStr = date ? `&start_death_date=${date[0]}&end_death_date=${date[1]}` : '';
    let countryStr = country ? `&country_id=${country}` : '';
    let statusStr = status ? `&status=${status}` : '';
    let sexStr = sex ? `&gender=${sex}` : '';
    let querySrt = query ? `&query=${query}` : '';
    return this.http.get(`${CONFIG.API}/person_list?page=${page}&lang=uk${ageStr}${dateStr}${countryStr}${statusStr}${sexStr}${querySrt}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}