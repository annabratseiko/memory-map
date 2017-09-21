import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { DatepickerModule } from 'angular2-material-datepicker'

import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { NouisliderModule } from 'ng2-nouislider';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DeathMapComponent } from './components/death-map/death-map.component';
import { BirthMapComponent } from './components/birth-map/birth-map.component';
import { DateComponent } from './components/filters/date/date.component';
import { AgeComponent } from './components/filters/age/age.component';
import { CountryComponent } from './components/filters/country/country.component';
import { SexComponent } from './components/filters/sex/sex.component';
import { StatusComponent } from './components/filters/status/status.component';
import { MainComponent } from './pages/main/main.component';
import { AboutComponent } from './pages/about/about.component';
import { ListComponent } from './pages/list/list.component';
import { FooterComponent } from './components/footer/footer.component';
import { PopupComponent } from './pages/popup/popup.component';
import { FiltersService } from "./shared/services/filters.service";
import { LoadingPopupComponent } from './components/loading-popup/loading-popup.component';
import { LoaderService } from './shared/services/loader.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/translate/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeathMapComponent,
    BirthMapComponent,
    DateComponent,
    AgeComponent,
    CountryComponent,
    SexComponent,
    StatusComponent,
    MainComponent,
    AboutComponent,
    ListComponent,
    FooterComponent,
    PopupComponent,
    LoadingPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,   
    NouisliderModule, 
    DatepickerModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAY8tdJX2RRoStDSVDi5T0eFRRYBfS4SWw'
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [FiltersService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
