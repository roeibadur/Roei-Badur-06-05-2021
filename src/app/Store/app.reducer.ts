import { ActionReducerMap} from '@ngrx/store';
import * as fromModels from '../models/models.model';
import * as fromAutoCompleted from '../AutoCompleted/Store/AutoCompleted.reducer';
import * as fromCurrentLocation from '../current-location/Store/current-location.reducer';
import * as fromFiveDays from '../five-days-weather/Store/five-days-weather.reducer';


export interface AppState {
  AutoCompleted: fromModels.AutoCompleteType;
  currentLocation: fromModels.TodayWeatherType;
  FiveDaysWeather: fromModels.FiveDayaWeatherType;
}

export const appReducer: ActionReducerMap<AppState> = {
  AutoCompleted: fromAutoCompleted.AutoCompletedReducer,
  currentLocation: fromCurrentLocation.CurrentLocationReducer,
  FiveDaysWeather: fromFiveDays.FiveDaysWeatherReducer
};
