import { Action } from '@ngrx/store';
import { CityInfoType } from '../../models/models.model';

export const GET_CITIES = '[Auto Completed] get 10 cities';
export const ERROR = "[Auto Completed] Error"
export const SET_CITIES = '[Auto Completed] set cities';


export class GetCities implements Action {
  readonly type = GET_CITIES;
  constructor(public payload: string) {}
}

export class ErrorHanding implements Action {
  readonly type = ERROR;
  constructor(public payload: string) {}
}

export class SetCities implements Action {
  readonly type = SET_CITIES;
  constructor(public payload: CityInfoType[]) {}
}


export type AutoCompletedActions = GetCities | SetCities | ErrorHanding;
