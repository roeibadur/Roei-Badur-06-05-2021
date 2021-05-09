import { Action } from '@ngrx/store';
import { CityInfoType } from '../../models/models.model';

export const GET_CITIES = '[Auto Completed] get 10 cities';
export const LOADING_AUTO_COMPLETE = "[Auto Completed] Loading"
export const SET_CITIES = '[Auto Completed] set cities';


export class GetCities implements Action {
  readonly type = GET_CITIES;
  constructor(public payload: string) {}
}

export class Loading implements Action {
  readonly type = LOADING_AUTO_COMPLETE;
}

export class SetCities implements Action {
  readonly type = SET_CITIES;
  constructor(public payload: CityInfoType[]) {}
}


export type AutoCompletedActions = GetCities | SetCities | Loading;
