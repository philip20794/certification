import { Component, OnInit } from '@angular/core';
import {ZipcodeService} from '../services/zipcode.service';
import {WeatherService} from '../services/weather.service';
import {take} from 'rxjs/operators';
import {City} from '../interfaces/city';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  zipcode: number;
  cities: Array<City>;
  constructor(private zipcodeService: ZipcodeService,
              private weatherService: WeatherService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getWeather();
  }

  addZipcode(): void {
    this.zipcodeService.saveZipcode(this.zipcode);
    this.zipcode = null;
    this.getWeather();
  }

  removeZipcode(zipcode: number): void {
    this.zipcodeService.removeZipcode(zipcode);
    this.getWeather();
  }

  getWeather(): void {
    this.cities = [];
    for (const zipcode of this.zipcodeService.getZipcodes()) {
      this.weatherService.getCurrentWeatherInformation(zipcode).pipe(take(1)).subscribe(result => {
        console.log(result)
        this.cities.push({
          zipcode,
          name: result.name,
          temp: result.main.temp,
          temp_max: result.main.temp_max,
          temp_min: result.main.temp_min,
          weather: {
            main: result.weather[0].main,
            icon: this.weatherService.getIconUrl(result.weather[0].main)
          }
        });
      }, error => {
        this.zipcodeService.removeZipcode(zipcode);
        this.snackBar.open('Invalid Zipcode', '', {duration: 2000});
      });
    }
  }

}
