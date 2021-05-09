import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AutoCompletedActions from '../AutoCompleted/Store/AutoCompleted.actions';
import * as fromApp from '../Store/app.reducer';
import { AutoCompleteType } from '../models/models.model';
import { CityInfoType } from '../models/models.model';
import { Subscription } from 'rxjs';
import * as CurrentLocationActions from '../current-location/Store/current-location.actions';
import * as FiveDaysWeatherActions from '../five-days-weather/Store/five-days-weather.actions';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  cities: CityInfoType [] = [];
  searchText = '';
  storeSub: Subscription
  constructor( private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.storeSub = this.store.select('AutoCompleted').subscribe((AutoCompletedState: AutoCompleteType) => {
      this.cities = AutoCompletedState.cities
    });
  }

  Onsearch() {
      if(this.searchText != '') {
          this.store.dispatch(new AutoCompletedActions.GetCities(this.searchText));
      }
      else {
        this.cities = [];
      }
  }
  FindCity(key: string,name: string) {
      this.store.dispatch(new CurrentLocationActions.GetCity({key:key,cityName:name}));
      this.store.dispatch(new FiveDaysWeatherActions.Get5DaysWeather(key));
      this.searchText = '';
      this.cities = [];
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
