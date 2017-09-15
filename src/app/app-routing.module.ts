import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import { AboutComponent } from "./pages/about/about.component";
import { ListComponent } from "./pages/list/list.component";

const appRoutes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full'},
  { path: 'about', component: AboutComponent },
  { path: 'list/:page', component: ListComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
