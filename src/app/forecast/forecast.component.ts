import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {WeatherService} from '../services/weather.service';
import {Forecast, Weather} from '../interfaces/forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  forecaste: Forecast;
  dateConfig = {weekday: 'long', day: 'numeric', month: 'numeric'};
  constructor(private activatedRoute: ActivatedRoute,
              private weatherService: WeatherService,
              private router: Router) { }

  ngOnInit(): void {
     this.getForecaste();
  }

  getForecaste(): void {
    const zipcode = this.activatedRoute.snapshot.params.zipcode;
    this.weatherService.getForecastWeatherInformation(zipcode)
      .pipe(take(1)).subscribe(result => {
      const days = Array<Weather>();
      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        days.push({
          date,
          weather: {
            main: result.list[i].weather[0].main,
            icon: this.weatherService.getIconUrl(result.list[i].weather[0].main),
          },
          temp: {
            max: result.list[i].temp.max,
            min: result.list[i].temp.min,
          }
        });
      }
      this.forecaste = {
        zipcode,
        name: result.city.name,
        days,
      };
    }, error => {
        console.log(error);
        this.router.navigate(['error/' + zipcode]);
    });
  }

  back(): void {
    this.router.navigate(['/']);
  }

}
