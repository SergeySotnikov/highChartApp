import {MainPageComponent} from './components/pages/main-page/main-page.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Chart1Component} from './components/charts/chart1/chart1.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        component: Chart1Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
