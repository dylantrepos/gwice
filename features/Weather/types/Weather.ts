export interface OpenMeteoDataCurrent {
  temperature: string;
  relativeHumidity: string;
  windSpeed: string;
  apparentTemperature: string;
  isDay: number;
  precipitation: string;
  weatherCode: number;
  weatherText: string;
}

export interface OpenMeteoDataDaily {
  time: string;
  date: string;
  weatherCode: number;
  temperatureMin: string;
  temperatureMax: string;
  precipitation: string;
  windSpeed: string;
  rain: number;
  sunrise: string;
  sunset: string;
}

export interface OpenMeteoDataHourly {
  time: string;
  date: string;
  hour: string;
  temperature: string;
  temperatureMin?: string;
  temperatureMax?: string;
  isDay: number;
  weatherCode: number;
  weatherText: string;
}

export interface OpenMeteoDataForecast {
  weather: OpenMeteoDataDaily;
  hourly: OpenMeteoDataHourly[];
}

export interface OpenMeteoData {
  current: OpenMeteoDataCurrent;
  forecast: Record<string, OpenMeteoDataForecast>;
}

export interface WeatherSettings {
  startDailyHour: number;
}
