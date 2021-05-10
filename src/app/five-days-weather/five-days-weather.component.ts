import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../Store/app.reducer';
import { FiveDayaWeatherType } from '../models/models.model';
import { WeatherItemType } from '../models/models.model';
import { Subscription } from 'rxjs';
import { Service } from '../notifcation.service';

@Component({
  selector: 'app-five-days-weather',
  templateUrl: './five-days-weather.component.html',
  styleUrls: ['./five-days-weather.component.css']
})
export class FiveDaysWeatherComponent implements OnInit, OnDestroy {
  fiveDayDetails: WeatherItemType [] = [];
  error: string = '';
  storeSub: Subscription;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  constructor(private store:Store<FromApp.AppState>,
              public service:Service) { }

  ngOnInit(){
    this.storeSub = this.store.select('FiveDaysWeather').subscribe((fivedays:FiveDayaWeatherType) => {
      this.error = fivedays.error;
      if(this.error !== '') {
          this.service.showError(this.error);
      }
      if(fivedays.DailyForecasts.length > 0) {
        this.fiveDayDetails = [];
        for( let i = 0; i< fivedays.DailyForecasts.length; i++) {
          this.fiveDayDetails.push({
            Date:fivedays.DailyForecasts[i].Date,
            Temperature:{
              Maximum:fivedays.DailyForecasts[i].Temperature.Maximum,
              Minimum:fivedays.DailyForecasts[i].Temperature.Minimum,
              DayIcon:fivedays.DailyForecasts[i].Temperature.DayIcon
            }});
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
