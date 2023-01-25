import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './components/pages/main-page/main-page.component';
import {Chart1Component} from './components/charts/chart1/chart1.component';
import {NavBarComponent} from './components/navbar/nav-bar/nav-bar.component';
import {HttpClientModule} from "@angular/common/http";
import {ChartModule,} from 'angular-highcharts';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    Chart1Component,
    NavBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
