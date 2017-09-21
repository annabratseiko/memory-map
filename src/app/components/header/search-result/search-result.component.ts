import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  host: {
    '(document:click)': 'handleClick($event)'
  },
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() searchCities: any;
  @Input() searchCitiesKeys: any;
  @Input() searchPersons: any;
  @Input() searchPersonsKeys: any;
  @Input() hideResult: boolean;
  @Input() endSearch: boolean;

  @Output() detailInfo: EventEmitter<any> = new EventEmitter();

  public elementRef;

  constructor(
    private myElement: ElementRef,
    private _dataService: DataService
  ) { 
    this.elementRef = myElement;
  }

  ngOnInit() {
  }

  cityClick(item: any, type: string) {
    console.log(item);
  }

  personClick(item: any) {
    this._dataService.getPersonDetail(item.id).subscribe(res => {
      let card = JSON.parse(JSON.stringify(res)).main;
      let info = {
        name: card.fullName,
        birthCity: card.birthCityName,
        deathCity: card.deathCityName,
        birthDate: card.birthDate,
        deathDate: card.deathDate,
        description: card.description,
        position: card.position,
        status: card.status,
        rank: card.rank
      }
      this.detailInfo.emit(info);
      this.hideResult = true;
    });
  }
  
  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);
    
    if (!inside){
      this.hideResult = true;
    } 
  }

}
