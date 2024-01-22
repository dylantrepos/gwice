export type OpenMeteoDataCurrent = {
  temperature: number;
  relativeHumidity: number;
  windSpeed: number;
  apparentTemperature: number;
  isDay: number;
  precipitation: number;
  weatherCode: number;
  weatherText: string;
};

export type OpenMeteoDataDaily = {
  time: string;
  date: string;
  weatherCode: number;
  temperatureMin: string;
  temperatureMax: string;
  precipitation: string;
  windSpeed: string;
  rain: number;
};

export type OpenMeteoDataHourly = {
  time: string;
  date: string;
  hour: string;
  temperature: string;
  isDay: number;
  weatherCode: number;
  weatherText: string;
};

export type OpenMeteoDataForecast = {
    weather: OpenMeteoDataDaily;
    hourly: OpenMeteoDataHourly[];
};

export type OpenMeteoData = {
  current: OpenMeteoDataCurrent;
  forecast: {
    [date: string]: OpenMeteoDataForecast;
  }
}

export type WeatherSettings = {
  laps: string;
  range: string;
}