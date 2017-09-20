import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public showMobMenu: boolean = false;
  
  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  mobMenuAction() {
    this.showMobMenu = !this.showMobMenu;
  }

  setLanguage(event) {
    this.translate.setDefaultLang(event.target.value);
  } 

}
