import React, { useEffect, useState } from 'react';
import { View, Image, Text, ImageProps } from 'react-native';
import { WeatherHourly } from '../../types/Weather';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { weatherCodeIcons } from '../../utils/weatherImgCode';
import { LoaderItem } from '../LoaderItem/LoaderItem';
import { ErrorItem } from '../ErrorItem/ErrorItem';
import style from './CityWeatherItem.style';
import useGetWeather from '../../hooks/useGetWeather';

const CityWeatherHourItem = ({
  temperature,
  hour,
  weatherCode,
  isDay
}: WeatherHourly) => {
  const imageSource = weatherCodeIcons[isDay ? 'day' : 'night'][weatherCode];
  console.log('weatherCode', weatherCode);

  return (
    <View style={style.cityWeatherSmallContainer}>
      <Image source={imageSource} style={style.cityWeatherSmallImage} />
      <Text style={style.cityWeatherSmallTextTitle}>{temperature}</Text>
      <Text>{hour}</Text>
    </View>
  );
}

export const CityWeatherItem = () => {
  const [imageSource, setImageSource] = useState<ImageProps>(require('../../assets/images/weather-icons/not-found.png'));
  const { currentCity } = useSelector((state: RootState) => state.general);

  // const [data, setData] = useState(null);
  const {isLoading, data: weather, error} = useGetWeather(currentCity.cityName);

  useEffect(() => { 
    if (!isLoading && weather) {
      console.log({weather});
      setImageSource(weatherCodeIcons[weather.current.isDay ? 'day' : 'night'][weather.current.weatherCode]);
    }
  }, [isLoading, weather]);

  return (
    <View>
      <View style={style.cityWeatherLargeContainer}>
        {isLoading 
          ? <LoaderItem />
          : error 
            ? <ErrorItem />
            : weather 
              ? <>
                  <Image source={imageSource} style={style.image} />
                  <View>
                      <Text style={style.textTitle}>{weather.current.temperature}</Text>
                      <Text>Précipitations : {weather.current.precipitation}</Text>
                      <Text>Humidité : {weather.current.humidity}</Text>
                      <Text>Vent : {weather.current.windSpeed}</Text>
                  </View> 
                </>
              : <Text>No weather data available.</Text>
        }
      </View>
      <View style={style.cityWeatherListSmall}>
        {(weather?.hourly ?? []).map((weatherElt, index) => (
          <CityWeatherHourItem 
            key={`weather-sm-item-${index}`}
            temperature={weatherElt?.temperature ?? ''}
            hour={weatherElt?.hour ?? ''}
            weatherCode={weatherElt?.weatherCode ?? ''}
            isDay={weatherElt?.isDay ?? ''}
          />)
        )}
      </View>
    </View>
  )
};
