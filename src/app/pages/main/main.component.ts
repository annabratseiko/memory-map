import { Component, OnInit } from '@angular/core';
import { DataService } from "../../shared/services/data.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DataService]
})
export class MainComponent implements OnInit {
  public cities: any;
  public filters: any;
  public personDetails: any = null;
  public showPopup: boolean = false;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getCities().subscribe(res => {
      console.log('get cities');
      this.cities = res;
    });

    this._dataService.getFilters().subscribe(res => {
      console.log('get filters', res);
      this.filters = JSON.parse(JSON.stringify(res));
    });
  }

  getDetailInfo(event) {
    this.showPopup = true;
    this.personDetails = event;
  }

  closePopup(event) {
    this.showPopup = event;
  }

}
