import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public showMobMenu: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  mobMenuAction() {
    this.showMobMenu = !this.showMobMenu;
  }

}
