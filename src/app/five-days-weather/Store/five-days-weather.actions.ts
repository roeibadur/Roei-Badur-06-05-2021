import { Action } from '@ngrx/store';
import { WeatherItemType } from '../../models/models.model'

export const GET5DAYSWEATHER = '[5 days] Get the weather';
export const SET5DAYSWEATHER = '[5 days] Set the weather';
export const ERROR = '[5 days] error';

export class Get5DaysWeather implements Action {
  readonly type = GET5DAYSWEATHER;
  constructor(public payload:string) {}
}

export class Set5DaysWeather implements Action {
  readonly type = SET5DAYSWEATHER;
  constructor(public payload: WeatherItemType[]) {}
}
export class ErrorHanding implements Action {
  readonly type = ERROR;
  constructor(public payload: string) {}
}

export type FiveDayaWeatherActions = Get5DaysWeather | Set5DaysWeather | ErrorHanding;

