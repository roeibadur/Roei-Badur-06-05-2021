import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-rounting.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchBarComponent } from './AutoCompleted/search-bar.component';
import {  CurrentLocationComponent } from './current-location/current-location.component';
import { FiveDaysWeatherComponent } from './five-days-weather/five-days-weather.component';

import * as fromApp from './Store/app.reducer';
import { AutoCompletedEffects } from './AutoCompleted/Store/AutoCompleted.effects';
import { CurrentLocationEffects } from './current-location/Store/current-location.effects';
import {  FiveDayaWeatherEffects} from './five-days-weather/Store/five-days-weather.effects';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FavoritesComponent,
    SearchBarComponent,
    CurrentLocationComponent,
    FiveDaysWeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AutoCompletedEffects, CurrentLocationEffects,FiveDayaWeatherEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
