import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../Store/app.reducer';
import { TodayWeatherType } from '../models/models.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.css']
})
export class CurrentLocationComponent implements OnInit, OnDestroy {
  details: TodayWeatherType = {
    key: '',
    cityName: '',
    Temperature: null,
    WeatherIcon: -1,
    WeatherText: ''
  }
  favorite: boolean = false;
  imagePath: string ;
  storeSub: Subscription
  constructor(private store: Store<FromApp.AppState>) { }

  ngOnInit() {
    this.storeSub = this.store.select('currentLocation').subscribe((todayWeather:TodayWeatherType) => {
      if(todayWeather.Temperature !== null) {
        this.details.cityName = todayWeather.cityName;
        this.details.Temperature = todayWeather.Temperature;
        this.details.WeatherIcon = todayWeather.WeatherIcon;
        this.details.WeatherText = todayWeather.WeatherText;
        this.details.key = todayWeather.key;
        this.imagePath = `https://developer.accuweather.com/sites/default/files/${todayWeather.WeatherIcon < 10
        ? "0" + todayWeather.WeatherIcon
        : todayWeather.WeatherIcon
        }-s.png`;
        // this.details.Temperature.Metric.Value = Math.floor(this.details.Temperature.Metric.Value);
        if(localStorage.getItem(this.details.key) !== null) {
          this.favorite = true;
        } else {
          this.favorite = false;
        }
      }
    });
  }

  AddtoFavorite() {
    if(localStorage.getItem(this.details.key) == null) {
      let city = {
        cityName: this.details.cityName,
        Temperature: Math.floor(this.details.Temperature.Metric.Value),
        WeatherIcon: this.imagePath,
        WeatherText: this.details.WeatherText,
        key:  this.details.key
      };
      window.localStorage.setItem(this.details.key,JSON.stringify(city));
      this.favorite = true;
    }
  }
  convertToC(fahrenheit: number) {
    let celsius = (fahrenheit - 32) / (9 / 5)
    return Math.round(celsius)
  }

  removeFromFavorite() {
    localStorage.removeItem(this.details.key);
    this.favorite = false;
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
