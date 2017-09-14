import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,   
    NouisliderModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAY8tdJX2RRoStDSVDi5T0eFRRYBfS4SWw'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
