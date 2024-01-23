import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
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
import { animationDuration, dateOptions } from '../weatherSettings';

export const CityWeatherItem = () => {
  const [imageSource, setImageSource] = useState<ImageProps>(require('../../../assets/images/weather-icons/not-found.png'));
  const { currentCity, weatherSettings, refetchHome } = useSelector((state: RootState) => state.general);
  const {isLoading, data: weather, error} = useGetWeather(currentCity.cityName, weatherSettings, refetchHome);
  const [weatherHourly, setWeatherHourly] = useState<OpenMeteoDataHourly[]>([]);
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const [dailyWeather, setDailyWeather] = useState<OpenMeteoDataForecast[]>([]);
  const [dailyWeatherDay, setDailyWeatherDay] = useState(0);
  const currentDate = `${day}/${month}`;
  const currentHour = date.getHours(); 
  const [showElt, setShowElt] = useState<boolean>(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const [itemWidth, setItemWidth] = useState(20);

  const onSwipeLeft = () => {
      setDailyWeatherDay((old) => {
        if (old + 1 < dailyWeather.length) {
          setShowElt(false);
          setTimeout(() => {
            setDailyWeatherDay(old + 1);
            setShowElt(true);
          }, animationDuration);
        } 
        return old;
      })
  }

  const onSwipeRight = () => {
      setDailyWeatherDay((old) => {
        if (old - 1 >= 0) {
          setShowElt(false);
          setTimeout(() => {
            setDailyWeatherDay(old - 1);
            setShowElt(true);
          }, animationDuration);
        } 
        return old;
      })
  }
  
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);


  const currentDateText = date.toLocaleDateString('fr-FR', dateOptions);

  const updateHourlyWeather = () => {
    if (!isLoading && weather) {
      const date = Object.values(weather.forecast)[dailyWeatherDay].weather.date;
      const currNextHourly = dailyWeatherDay === 0 ? weather.forecast[date].hourly.filter((hourly) => {
        const hour = hourly.hour.split(':')[0];
        return +hour > currentHour || +hour > 19;
      }) : weather.forecast[date].hourly;

      setWeatherHourly(currNextHourly);
    }
  }

  useEffect(() => { 
    if (!isLoading && weather) {
      const forecast = Object.values(weather.forecast);
      setDailyWeather(forecast);
      updateHourlyWeather();
      
      setImageSource(weatherCodeIcons[weather.current.isDay ? 'day' : 'night'][weather.current.weatherCode]);
    }
    if (scrollViewRef.current) {
      const scrollTo = dailyWeatherDay === 0 ? 0 : (itemWidth + 10) * weatherSettings.startDailyHour;
      scrollViewRef.current.scrollTo({ x: scrollTo, animated: true });
    }
  }, [isLoading, weather, weatherSettings, dailyWeatherDay]);

  return (
    <View
      style={style.cityWeatherItem}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setItemWidth(Math.round((Math.round(width) - (3 * 10)) / 4))
      }}
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
                  show={showElt}
                />
                : <CityWeatherDailyItem 
                    weather={dailyWeather[dailyWeatherDay]?.weather} 
                    show={showElt}
                  />
              : <Text>No weather data available.</Text>
        }
      </View>
      <ScrollView 
        horizontal={true}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        snapToInterval={itemWidth + 10}
        contentContainerStyle={{
          columnGap: 10,
        }}
        style={style.cityWeatherListSmall}
      >
        {(weatherHourly)?.map((weatherElt, index) => (
          <CityWeatherHourlyItem 
            key={`weather-sm-item-${index}`}
            weather={weatherElt}
            show={showElt}
            styleProps={{
              width: itemWidth,
            }}
          />)
        )}
      </ScrollView>
    </View>
  )
};
