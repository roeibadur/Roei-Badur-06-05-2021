import { Component, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../Store/app.reducer';
import * as CurrentLocationActions from '../current-location/Store/current-location.actions';
import { Router } from '@angular/router';
import { Service } from '../notifcation.service';

interface cityDetails {
  cityName: string,
  Temperature: number,
  WeatherIcon: string,
  WeatherText: string,
  key: string
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit , OnChanges {
  favorites : cityDetails[] = []
  constructor(
    private store: Store<fromApp.AppState>,
    private router:Router,
    public service: Service) { }

  ngOnInit() {
      this.init();
  }
  init() {
    for(let i = 0; i < localStorage.length; i++) {
      let city = JSON.parse(window.localStorage.getItem(localStorage.key(i)));
      this.favorites.push({
        cityName:    city.cityName,
        Temperature: city.Temperature,
        WeatherIcon: city.WeatherIcon,
        WeatherText: city.WeatherText,
        key: city.key
      });
    }
  }
  ngOnChanges() {
      this.init();
  }

  setCity(key: string,cityName: string) {
      this.store.dispatch(new CurrentLocationActions.GetCity({key:key,cityName:cityName}));
      this.router.navigate(['']);
  }
  convertToC(fahrenheit: number) {
    let celsius = (fahrenheit - 32) / (9 / 5)
    return Math.round(celsius)
  }

}
