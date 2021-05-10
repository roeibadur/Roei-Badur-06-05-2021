import * as CurrentLocationActions from './current-location.actions';
import { TodayWeatherType } from '../../models/models.model';

const initialstate: TodayWeatherType = {
  Temperature: null,
  key: '',
  WeatherText: '',
  cityName: '',
  WeatherIcon: -1,
  error: ''
};

export function CurrentLocationReducer(state: TodayWeatherType = initialstate, action: CurrentLocationActions.CurrentLocationActions) {
  switch(action.type) {
    case CurrentLocationActions.SET_CITY:
      return {
        ...state,
        key: action.payload.key,
        cityName:action.payload.cityName,
        Temperature: action.payload.Temperature,
        WeatherText: action.payload.WeatherText,
        WeatherIcon: action.payload.WeatherIcon,
        error:''
      };
    case CurrentLocationActions.EROOR:
      return {
        ...state,
        error:action.payload
      }
    default: return state;
  }
}
