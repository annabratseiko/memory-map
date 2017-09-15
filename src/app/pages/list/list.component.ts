import { Component, OnInit } from '@angular/core';
import { DataService } from "../../shared/services/data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [DataService]
})
export class ListComponent implements OnInit {
  public list: any;
  public listKeys: any;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getList(1).subscribe(res => {
      this.list = JSON.parse(JSON.stringify(res)).main;
      this.listKeys = Object.keys(this.list);
      console.log(this.list);
    });
  }

}
