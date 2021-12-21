import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(public httpClient: HttpClient) { }

  getCurrentWeatherInformation(zipcode: number): Observable<any> {
    return this.httpClient.get(
      'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode
      + '&appid=5a4b2d457ecbef9eb2a71e480b947604',
      {params: new HttpParams().set('units',  'imperial')});
  }

  getForecastWeatherInformation(zipcode: number): Observable<any> {
    return this.httpClient.get(
      'https://api.openweathermap.org/data/2.5/forecast/daily?zip=' + zipcode
      + '&appid=5a4b2d457ecbef9eb2a71e480b947604',
      {params: new HttpParams().set('units',  'imperial')});
  }

  getIconUrl(weatherDescription: string): string {
    switch (weatherDescription.toLowerCase()) {
      case 'thunderstorm':
      case 'rain':
        return 'https://www.angulartraining.com/images/weather/rain.png';
      case 'mist':
      case 'snow':
        return 'https://www.angulartraining.com/images/weather/snow.png';
      case 'clear':
        return 'https://www.angulartraining.com/images/weather/sun.png';
      case 'clouds':
      default:
        return 'https://www.angulartraining.com/images/weather/clouds.png';
    }
  }

}
