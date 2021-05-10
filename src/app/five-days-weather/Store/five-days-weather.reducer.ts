import { FiveDayaWeatherType } from '../../models/models.model';
import * as FiveDayaWeatherActions from './five-days-weather.actions';

const initalState: FiveDayaWeatherType = {
  DailyForecasts: [],
  error: ''
};

export function FiveDaysWeatherReducer(state: FiveDayaWeatherType = initalState,action: FiveDayaWeatherActions.FiveDayaWeatherActions ) {
  switch(action.type) {
    case FiveDayaWeatherActions.SET5DAYSWEATHER:
      console.log(action.payload);
      return {
        ...state,
        error: '',
        DailyForecasts: action.payload == null ? [] : [...action.payload]
      };
    case FiveDayaWeatherActions.ERROR:
      return {
          ...state,
          error: action.payload
      };
    default: return state;
  }
}
