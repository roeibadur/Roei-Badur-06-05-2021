import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './Store/app.reducer';
import * as CurrentLocationActions from './current-location/Store/current-location.actions';
import * as FiveDaysWeatherActions from './five-days-weather/Store/five-days-weather.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WeatherApp';
  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new CurrentLocationActions.GetCity({key: '215854', cityName: 'tel aviv'}));
    this.store.dispatch(new FiveDaysWeatherActions.Get5DaysWeather('215854'));
  }
}
