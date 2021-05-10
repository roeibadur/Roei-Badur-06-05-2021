import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as fromFiveDaysActions from './five-days-weather.actions';
import { switchMap, map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { WeatherItemType } from '../../models/models.model';
import { catchError} from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class FiveDayaWeatherEffects {

  constructor(
    public actions$: Actions,
    public http: HttpClient) {}
  @Effect()
    getFiveDays = this.actions$.pipe(ofType(fromFiveDaysActions.GET5DAYSWEATHER),
    switchMap((get5daysAction: fromFiveDaysActions.Get5DaysWeather) => {
        return this.http.get<[]>(`${environment.address}/forecasts/v1/daily/5day/${get5daysAction.payload}?apikey=${environment.ApiKey}`)
    .pipe(map((results:any) =>{
      let fiveDays: WeatherItemType [] = [] ;
        for(let i=0; i< results.DailyForecasts.length; i++) {
            fiveDays.push({Date: new Date(results.DailyForecasts[i].Date),Temperature: {
              Minimum: results.DailyForecasts[i].Temperature.Minimum.Value,
              Maximum: results.DailyForecasts[i].Temperature.Maximum.Value,
              DayIcon: results.DailyForecasts[i].Day.Icon
            }});
        }
        return new fromFiveDaysActions.Set5DaysWeather(fiveDays);
    }),catchError(error => {
        return of(new fromFiveDaysActions.ErrorHanding('error fetching search information'));
    }))})
    );
}
