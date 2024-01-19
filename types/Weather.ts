export type Weather = {
  current: WeatherCurrent,
  hourly: WeatherHourly[]
}

export type WeatherCurrent = {
  hour: string,
  temperature: string,
  windSpeed: string,
  humidity: string,
  isDay: number,
  precipitation: string,
  weatherCode: number,
  weatherText: string,
  image: string
}

export type WeatherHourly = {
  image?: string,
  hour: string,
  temperature: string,
  weatherCode: number,
  weatherText?: string,
  isDay: number
}