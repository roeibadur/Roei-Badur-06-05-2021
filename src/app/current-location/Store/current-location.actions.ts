import { Action } from '@ngrx/store';
import { TodayWeatherType } from '../../models/models.model';

export const GET_CITY = '[Loaction] Get a city';
export const SET_CITY = '[Loaction] Set a city';

export class GetCity implements Action {
  readonly type = GET_CITY;
  constructor(public payload: {key: string, cityName: string}) {}
}

export class SetCity implements Action {
  readonly type = SET_CITY;
  constructor(public payload: TodayWeatherType) {}
}

export type CurrentLocationActions = GetCity | SetCity;
