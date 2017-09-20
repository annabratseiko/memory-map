import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    translate.addLangs(["en", "ua"]);
    translate.setDefaultLang('ua');

    // let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|ua/) ? browserLang : 'en');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    let width = window.innerWidth;
    if(width < 769) {
      this.router.navigate(['/list', 1]);
    }
  }

  ngOnInit() {
    this.onResize();
  }

}
