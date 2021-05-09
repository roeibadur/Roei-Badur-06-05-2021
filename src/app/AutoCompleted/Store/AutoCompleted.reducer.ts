import * as AutoCompletedActions from './AutoCompleted.actions';
import { AutoCompleteType } from '../../models/models.model';

const initialstate: AutoCompleteType = {
  cities: []
};


export function AutoCompletedReducer(state: AutoCompleteType = initialstate,action: AutoCompletedActions.AutoCompletedActions) {
  switch(action.type) {
    case AutoCompletedActions.SET_CITIES:
      return {
        ...state,
        cities: action.payload === null ? [] : [...action.payload]
      };
    case AutoCompletedActions.LOADING_AUTO_COMPLETE:
        return {
          ...state
        }
    default: return state;
  }
}
