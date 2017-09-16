import { Component, OnInit, Input, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { FiltersService } from "../../../shared/services/filters.service";

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, AfterViewInit {
  private _filter: any;
  
  @ViewChild('container') container: ElementRef;
  @ViewChild('sliderRef') sliderRef;
  
  public dateArray: any;
  public startDate: any;
  public endDate: any;
  public range: any = [this.timestamp(2014, 1), this.timestamp(2017, 9)];
  public configs = {
      connect: true,
      range: {
        min: this.timestamp(2014, 1),
        max: this.timestamp(2017, 9)
      },
      start: [ this.timestamp(2014, 1), this.timestamp(2017, 9) ],
      step: 4 * 7 * 24 * 60 * 60 * 1000
  };
  
  @Input('filter') set filter(value: any) {
    if (value) {
      this._filter = value;  
      this.dateArray = Object.keys(value).sort();
      console.log('dadada', value);
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
    let allMonthData = [];
    let max = 0;
    
    this.dateArray.forEach(element => {
      let months = Object.keys(this.filter[element]);
      months.forEach(i => {
        allMonthData.push(+this.filter[element][i]);
      });
    });

    allMonthData.forEach(element => {
      max = Math.max(max, element);
    });

    allMonthData.forEach(element => {
      let item = document.createElement('div');
      item.className = 'graph-item';
      item.style.height = (element / max) * 100 + '%';
      this.container.nativeElement.appendChild(item);
    });
 
  }

  ngOnInit() {
    this.buildGraph();
  }

  ngAfterViewInit() {
  }

  timestamp(year: number, month: number){
    return new Date(year, month).getTime();   
  }

  formatDate (date) {
    console.log(date);
    let obj = {
      date: new Date(date).getDate(),
      month: new Date(date).getMonth() + 1,
      year: new Date(date).getFullYear()
    };
    return obj.year + '-' + obj.month + '-' + obj.date;
}

  onChange(event) {
    console.log(event);
    let start = this.formatDate(event[0]);
    let end = this.formatDate(event[1]);
    this._filterService.changeFilter([start, end], 'date');
  }

  resetFilter() {
    this._filterService.changeFilter(null, 'date');
  }

}
