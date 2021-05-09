export interface FavoritesType {
  data: FavoriteType[]
}

export interface CurrentCityType {
  cityInfo: CityInfoType,
  todayWeather: TodayWeatherType,
  fiveDayaWeather: FiveDayaWeatherType,
  data: Object
}

export interface FavoriteType extends CurrentCityType { }

export interface CityInfoType {
  LocalizedName: string,
  Key: string
}

export interface TodayWeatherType {
  key: string,
  Temperature: TemperatureType,
  WeatherText: string,
  cityName: string,
  WeatherIcon: number
}

export interface TemperatureType {
  Metric: MetricImperialType,
  Imperial: MetricImperialType
}

export interface MetricImperialType {
  Value: number,
  Unit: string,
  UnitType: number
}

export interface FiveDayaWeatherType {
  DailyForecasts: WeatherItemType []
}

export interface WeatherItemType {
  Date: Date;
  Temperature: Temperature5DaysType;
}

export interface Temperature5DaysType {
  Minimum: number,
  Maximum: number,
  DayIcon: number
}

export interface AutoCompleteType {
  cities: CityInfoType []
}

