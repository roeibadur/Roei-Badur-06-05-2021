import * as CurrentLocationActions from './current-location.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodayWeatherType } from '../../models/models.model';
import { switchMap , map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Effect , Actions , ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class CurrentLocationEffects {
  currentcity;
  currentKey;
  constructor(
    private http: HttpClient,
    private action$: Actions) {}
  @Effect()
    cities = this.action$.pipe(
      ofType(CurrentLocationActions.GET_CITY),
      switchMap( (getcurrentCityAction: CurrentLocationActions.GetCity ) => {
        this.currentcity = getcurrentCityAction.payload.cityName;
        this.currentKey = getcurrentCityAction.payload.key;
        return this.http.get<[]>(`${environment.address}/currentconditions/v1/${getcurrentCityAction.payload.key}?apikey=${environment.ApiKey}`)
      .pipe(map( (result: any) => {
        let city: TodayWeatherType = {
          key:this.currentKey,
          cityName: this.currentcity,
          Temperature: result[0].Temperature,
          WeatherText: result[0].WeatherText,
          WeatherIcon: result[0].WeatherIcon,
          error: ''
        }
        return new CurrentLocationActions.SetCity(city);
      }),catchError(error => {
          return of(new CurrentLocationActions.ErrorHanding('error fetching search information'));
      }))})
    );

}
