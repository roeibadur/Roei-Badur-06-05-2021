import { FiveDayaWeatherType } from '../../models/models.model';
import * as FiveDayaWeatherActions from './five-days-weather.actions';

const initalState: FiveDayaWeatherType = {
  DailyForecasts: []
};

export function FiveDayaWeatherReducer(state: FiveDayaWeatherType = initalState,action: FiveDayaWeatherActions.FiveDayaWeatherActions ) {
  switch(action.type) {
    case FiveDayaWeatherActions.SET5DAYSWEATHER:
      return {
        ...state,
        DailyForecasts: [...action.payload]
      }
    default: return state;
  }
}
