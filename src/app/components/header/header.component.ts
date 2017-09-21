import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../../shared/services/data.service';
import { FiltersService } from '../../shared/services/filters.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DataService]
})
export class HeaderComponent implements OnInit {
  public showMobMenu: boolean = false;
  public searchQuery: string = '';
  public currentLang: string = 'ua';

  private subscription: Subscription;
  
  constructor(
    private translate: TranslateService,
    private _dataService: DataService,
    private _filterService: FiltersService
  ) { }

  ngOnInit() {
    this.subscription = this._filterService.filterChoosen$.subscribe(filters => {
      console.log('filHE', filters);
    });
  }

  mobMenuAction() {
    this.showMobMenu = !this.showMobMenu;
  }

  setLanguage(event) {
    this.translate.use(event.target.value);
  } 

  changeLang(event, lang: string) {
    event.preventDefault();
    this.translate.use(lang);
    this.currentLang = lang;
  }

  startSearch(event?) {
    if(event && event.keyCode !== 13) {
      return;
    }

    this._filterService.changeFilter(this.searchQuery, 'query');

    // this._explorerService.search(this.searchQuery).subscribe(
    //   res => {
    //     if(res.success) {
    //       this.searchQuery = '';
    //       this.router.navigate([`/${res.type}`, res.id]);
    //       this.openMobileMenu = false;
    //     }
    //   }
    // );
  }


}
