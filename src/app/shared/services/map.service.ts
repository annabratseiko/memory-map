import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoaderModel } from '../const/loader.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'

@Injectable()
export class MapService {
  private mapBirthSourse = new Subject<any>();
  private mapDeathSourse = new Subject<any>();
  
  setBirthCenter$ = this.mapBirthSourse.asObservable();
  setDeathCenter$ = this.mapDeathSourse.asObservable();
  
  changeBirthFilter(value: any) {
    this.mapBirthSourse.next(value);
  }

  changeDeathFilter(value: any) {
    this.mapDeathSourse.next(value);
  }

}
