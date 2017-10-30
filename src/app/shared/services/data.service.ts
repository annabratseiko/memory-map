import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestOptions, Headers } from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class DataService {

  constructor(
    private http: Http,
    private translate: TranslateService
  ) { }

  public getCities(age?, date?, country?, status?, sex?, query?) : Observable<any> {
    let ageStr = age ? `&start_age=${age[0]}&end_age=${age[1]}` : '';
    let dateStr = date ? `&start_death_date=${date[0]}&end_death_date=${date[1]}` : '';
    let countryStr = country ? `&country_id=${country}` : '';
    let statusStr = status ? `&status=${status}` : '';
    let sexStr = sex ? `&gender=${sex}` : '';
    let querySrt = query ? `&query=${query}` : '';
    let lg = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return this.http.get(`${CONFIG.API}/cities?lang=${lg}${ageStr}${dateStr}${countryStr}${statusStr}${sexStr}${querySrt}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getFilters() : Observable<any> {
    let lg = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return this.http.get(`${CONFIG.API}/filters?lang=${lg}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getPersonListCity(id, type, age?, country?, date?, sex?, status?) : Observable<any> {
    let ageStr = age ? `&start_age=${age[0]}&end_age=${age[1]}` : '';
    let dateStr = date ? `&start_death_date=${date[0]}&end_death_date=${date[1]}` : '';
    let countryStr = country ? `&country_id=${country}` : '';
    let statusStr = status ? `&status=${status}` : '';
    let sexStr = sex ? `&gender=${sex}` : '';
    let lg = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return this.http.get(`${CONFIG.API}/person_list_city?city_id=${id}&city_type=${type}&lang=${lg}${ageStr}${dateStr}${countryStr}${statusStr}${sexStr}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getPersonShort(id, age?, country?, date?, sex?, status?) : Observable<any> {
    let ageStr = age ? `&start_age=${age[0]}&end_age=${age[1]}` : '';
    let dateStr = date ? `&start_death_date=${date[0]}&end_death_date=${date[1]}` : '';
    let countryStr = country ? `&country_id=${country}` : '';
    let statusStr = status ? `&status=${status}` : '';
    let sexStr = sex ? `&gender=${sex}` : '';
    let lg = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return this.http.get(`${CONFIG.API}/person_short?person_id=${id}&lang=${lg}${ageStr}${dateStr}${countryStr}${statusStr}${sexStr}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getPersonDetail(id) : Observable<any> {
    let lg = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return this.http.get(`${CONFIG.API}/person_detail?person_id=${id}&lang=${lg}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getList(page, age?, country?, date?, sex?, status?, query?, birthCity?, deathCity?, unit?, callout?) : Observable<any> {
    let ageStr = age ? `&start_age=${age[0]}&end_age=${age[1]}` : '';
    let dateStr = date ? `&start_death_date=${date[0]}&end_death_date=${date[1]}` : '';
    let countryStr = country ? `&country_id=${country}` : '';
    let statusStr = status ? `&status=${status}` : '';
    let sexStr = sex ? `&gender=${sex}` : '';
    let querySrt = query ? `&query=${query}` : '';
    let birthCityStr = birthCity ? `&birth_city_id=${birthCity}` : '';
    let deathCityStr = deathCity ? `&death_city_id=${deathCity}` : '';
    let unitStr = unit ? `&unit=${unit}` : '';
    let calloutStr = callout ? `&callous=${callout}` : '';
    let lg = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return this.http.get(`${CONFIG.API}/person_list?page=${page}&lang=${lg}${ageStr}${dateStr}${countryStr}${statusStr}${sexStr}${querySrt}${birthCityStr}${deathCityStr}${unitStr}${calloutStr}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public search(query: string) : Observable<any> {
    let lg = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return this.http.get(`${CONFIG.API}/search?query=${query}&lang=${lg}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public searchCities(query: string, type: number) : Observable<any> {
    let lg = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return this.http.get(`${CONFIG.API}/cities-by-type?query=${query}&lang=${lg}&city_type=${type}`)
      .map((res:Response) => {return res.json();})
      .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public sendMail(data: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${CONFIG.API}/mail`, data, options)
               .map((res:Response) => {return res;})
               .catch((error:any) => Observable.throw(error || 'Server error'));
  } 

  public getActionPersonList(type: string, query: string): Observable<any> {
    let actionStr = (type == 'callout') ? `callout=${query}` : `unit=${query}`;
    let lg = this.translate.currentLang ? this.translate.currentLang : this.translate.getDefaultLang();
    return this.http.get(`${CONFIG.API}/actionPerson_list?${actionStr}&lang=${lg}`)
    .map((res:Response) => {return res.json();})
    .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}