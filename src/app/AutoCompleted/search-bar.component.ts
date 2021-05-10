import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AutoCompletedActions from '../AutoCompleted/Store/AutoCompleted.actions';
import * as fromApp from '../Store/app.reducer';
import { AutoCompleteType } from '../models/models.model';
import { CityInfoType } from '../models/models.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as CurrentLocationActions from '../current-location/Store/current-location.actions';
import * as FiveDaysWeatherActions from '../five-days-weather/Store/five-days-weather.actions';
import { Service } from '../notifcation.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  cities: CityInfoType [] = [];
  storeSub: Subscription;
  form: FormGroup;
  error:string = '';
  constructor( private store: Store<fromApp.AppState>,
    private notifaction: Service) { }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl(null,Validators.pattern('^[a-zA-Z ]*$'))
    });
    this.storeSub = this.store.select('AutoCompleted').subscribe((AutoCompletedState: AutoCompleteType) => {
      this.cities = AutoCompletedState.cities
      this.error = AutoCompletedState.error;
      if( this.error !== '') {
        this.notifaction.showError(this.error);
      }
    });
  }

  Onsearch() {
    if(this.form.valid) {
      if(this.form.value.search !== '') {
        this.store.dispatch(new AutoCompletedActions.GetCities(this.form.value.search));
      }
      else {
        this.cities = [];
      }
    }
    else {
      this.notifaction.showError('Enter only English letters');
    }
  }
  FindCity(key: string,name: string) {
      this.store.dispatch(new FiveDaysWeatherActions.Get5DaysWeather(key));
      this.store.dispatch(new CurrentLocationActions.GetCity({key:key,cityName:name}));
      this.form.value.search = '';
      this.cities = [];
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
