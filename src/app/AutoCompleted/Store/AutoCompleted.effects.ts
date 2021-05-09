import * as AutoCompletedActions from './AutoCompleted.actions';
import * as fromApp from '../../Store/app.reducer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap , map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Effect , Actions , ofType } from '@ngrx/effects';


@Injectable()
export class AutoCompletedEffects {

  constructor(
    private http: HttpClient,
    private action$: Actions) {}
  @Effect()
    cities = this.action$.pipe(
      ofType(AutoCompletedActions.GET_CITIES),
      switchMap( (getCitiesAction: AutoCompletedActions.GetCities ) => {
        return this.http.get<[]>(`${environment.address}locations/v1/cities/autocomplete?apikey=${environment.ApiKey}&q=${getCitiesAction.payload}`)
      }), map( results => {
        return new AutoCompletedActions.SetCities(results);
      })
    );

}
