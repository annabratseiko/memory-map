import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sex',
  templateUrl: './sex.component.html',
  styleUrls: ['./sex.component.css']
})
export class SexComponent implements OnInit {
  @Input() filter: any;
  constructor() { }

  ngOnInit() {
    console.log('f-sex', this.filter);
  }

}
