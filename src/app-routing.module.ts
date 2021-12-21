import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './app/home/home.component';
import {ForecastComponent} from './app/forecast/forecast.component';
import {ErrorComponent} from './app/error/error.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'error/:zipcode', component: ErrorComponent },
  { path: 'forecast/:zipcode', component: ForecastComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


