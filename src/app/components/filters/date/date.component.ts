import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  private _filter: any;
  
  @ViewChild('container') container: ElementRef;
  
  public dateArray: any[];
  public range: any = [2014, 2017];
  public configs = {
      connect: true,
      range: {
        min: 2014,
        max: 2017
      },
      step: 1
  };
  
  @Input('filter') set filter(value: any) {
    if (value) {
      this._filter = value;  
      this.dateArray = Object.keys(value);
    } else {
      this._filter = null;
    }
  }

  get filter(): any {
    return this._filter;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document
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

  onChange(event) {
    console.log(event);
  }

}
