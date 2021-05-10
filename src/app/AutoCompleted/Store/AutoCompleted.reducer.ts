import * as AutoCompletedActions from './AutoCompleted.actions';
import { AutoCompleteType } from '../../models/models.model';

const initialstate: AutoCompleteType = {
  cities: [],
  error: ''
};


export function AutoCompletedReducer(state: AutoCompleteType = initialstate,action: AutoCompletedActions.AutoCompletedActions) {
  switch(action.type) {
    case AutoCompletedActions.SET_CITIES:
      return {
        ...state,
        error: '',
        cities: action.payload === null ? [] : [...action.payload]
      };
    case AutoCompletedActions.ERROR:
        return {
          ...state,
          error:action.payload,
          cities: []
        }
    default: return state;
  }
}
