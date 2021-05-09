import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../Store/app.reducer';
import { FiveDayaWeatherType } from '../models/models.model';
import { WeatherItemType } from '../models/models.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-five-days-weather',
  templateUrl: './five-days-weather.component.html',
  styleUrls: ['./five-days-weather.component.css']
})
export class FiveDaysWeatherComponent implements OnInit, OnDestroy {
  fiveDayDetails: WeatherItemType [] = [];
  storeSub: Subscription;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor(private store:Store<FromApp.AppState>) { }

  ngOnInit(){
    this.storeSub = this.store.select('FiveDayaWeather').subscribe((fivedays:FiveDayaWeatherType) => {
      if(fivedays.DailyForecasts.length > 0) {
        this.fiveDayDetails = [...fivedays.DailyForecasts];
        for( let i = 1; i< fivedays.DailyForecasts.length; i++) {
            this.fiveDayDetails[i].Temperature.Maximum = this.convertToC(this.fiveDayDetails[i].Temperature.Maximum);
            this.fiveDayDetails[i].Temperature.Minimum = this.convertToC(this.fiveDayDetails[i].Temperature.Minimum);
        }
      }
    })
  }

  convertToC(fahrenheit: number) {
    let celsius = (fahrenheit - 32) / (9 / 5)
    return Math.round(celsius)
  }
  covertImage(WeatherIcon: number) {
   let str = `https://developer.accuweather.com/sites/default/files/${WeatherIcon < 10 ? "0" + WeatherIcon
        : WeatherIcon}-s.png`;
   return str;
  }
  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
