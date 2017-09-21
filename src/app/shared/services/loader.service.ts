import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoaderModel } from '../const/loader.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'

@Injectable()
export class LoaderService {
  public loadStack = new LoaderModel();

  private loadSourse = new Subject<any>();
  private urlSourse = new Subject<any>();
  
  showLoader$ = this.loadSourse.asObservable();
  changeRoute$ = this.urlSourse.asObservable();
  
  loadComplete(value: any, type: string) {
    switch(type) {
      case 'map': {
        this.loadStack.map = value;
        break;
      }
      case 'filters': {
        this.loadStack.filters = value;
        break;
      }
      case 'list': {
        this.loadStack.list = value;
        break;
      }
    }
    this.loadSourse.next(this.loadStack);
  }

  routeChange(value: string) {
    this.urlSourse.next(value);
  }

}
