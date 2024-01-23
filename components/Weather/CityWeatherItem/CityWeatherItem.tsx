import React, { useEffect, useState } from 'react';
import { View, Image, Text, ImageProps, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { weatherCodeIcons } from '../../../utils/weatherImgCode';
import { LoaderItem } from '../../LoaderItem/LoaderItem';
import { ErrorItem } from '../../ErrorItem/ErrorItem';
import style from './CityWeatherItem.style';
import useGetWeather from '../../../hooks/useGetWeather';
import { OpenMeteoDataForecast, OpenMeteoDataHourly } from '../../../types/Weather';
import { useSwipe } from '../../../hooks/useSwap';
import { CityWeatherHourlyItem } from '../CityWeatherHourlyItem/CityWeatherHourlyItem';
import { CityWeatherCurrentItem } from '../CityWeatherCurrentItem/CityWeatherCurrentItem';
import { CityWeatherDailyItem } from '../CityWeatherDailyItem/CityWeatherDailyItem';
import { dateOptions } from '../weatherSettings';

export const CityWeatherItem = () => {
  const [imageSource, setImageSource] = useState<ImageProps>(require('../../../assets/images/weather-icons/not-found.png'));
  const { currentCity, weatherSettings, refetchHome } = useSelector((state: RootState) => state.general);
  const {isLoading, data: weather, error} = useGetWeather(currentCity.cityName, weatherSettings, refetchHome);
  const [weatherHourly, setWeatherHourly] = useState<OpenMeteoDataHourly[]>([]);
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const [currentData, setCurrentData] = useState<number>(0);
  const [dailyWeather, setDailyWeather] = useState<OpenMeteoDataForecast[]>([]);
  const [dailyWeatherDay, setDailyWeatherDay] = useState(0);
  const currentDate = `${day}/${month}`;
  const currentHour = date.getHours(); 

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

    function onSwipeLeft(){
        console.log('SWIPE_LEFT')
        setDailyWeatherDay((old) => {
          console.log('old', old);
          if (old + 1 < dailyWeather.length) {
            return old + 1
          } else return old;
        })
    }

    function onSwipeRight(){
        console.log('SWIPE_RIGHT');
        setDailyWeatherDay((old) => {
          console.log('old', old);
          if (old - 1 >= 0) {
            return old - 1
          } else return old;
        })
    }

  const currentDateText = date.toLocaleDateString('fr-FR', dateOptions);


  useEffect(() => { 
    if (!isLoading && weather) {
      const currNextHourly = weather.forecast[currentDate].hourly.filter((hourly) => {
        const hour = hourly.hour.split(':')[0];
        return +hour > currentHour || +hour > 19;
      });

      setWeatherHourly(currNextHourly);
      const forecast = Object.values(weather.forecast);
      // console.log('forecast', forecast);
      setDailyWeather(forecast);

      setImageSource(weatherCodeIcons[weather.current.isDay ? 'day' : 'night'][weather.current.weatherCode]);
    }
  }, [isLoading, weather]);

  useEffect(() => {
    const currHourly = dailyWeatherDay === 0 
    ? dailyWeather[dailyWeatherDay]?.hourly.filter((hourly) => {
      const hour = hourly.hour.split(':')[0];
      return +hour > currentHour || +hour > 19;
    }) 
    : dailyWeather[dailyWeatherDay]?.hourly ?? [];
    setWeatherHourly(currHourly);
  }, [dailyWeatherDay])

  return (
    <View
      style={style.cityWeatherItem}
    >
      <View 
        style={style.cityWeatherLargeContainer}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
      >
        {isLoading 
          ? <LoaderItem />
          : error 
            ? <ErrorItem />
            : weather && dailyWeather.length > 0
              ? dailyWeatherDay === 0 ? 
                <CityWeatherCurrentItem 
                  imageSource={imageSource}
                  currentDateText={currentDateText}
                  weather={weather.current}
                />
                : <CityWeatherDailyItem 
                    weather={dailyWeather[dailyWeatherDay]?.weather} 
                  />
              : <Text>No weather data available.</Text>
        }
      </View>
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        snapToInterval={30}
        contentContainerStyle={{
          columnGap: 10,
        }}
        style={style.cityWeatherListSmall}
      >
        {(weatherHourly)?.map((weatherElt, index) => (
          <CityWeatherHourlyItem 
            key={`weather-sm-item-${index}`}
            weather={weatherElt}
          />)
        )}
      </ScrollView>
    </View>
  )
};
