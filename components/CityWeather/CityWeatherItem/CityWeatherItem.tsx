import React, { useEffect, useRef, useState } from 'react';
import { View, ImageProps, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { weatherCodeIcons } from '../../../utils/weatherImgCode';
import style from './CityWeatherItem.style';
import useGetWeather from '../../../hooks/useGetWeather';
import { OpenMeteoDataForecast, OpenMeteoDataHourly } from '../../../types/Weather';
import { useSwipe } from '../../../hooks/useSwap';
import { CityWeatherHourlyItem } from '../CityWeatherHourlyItem/CityWeatherHourlyItem';
import { CityWeatherCurrentItem } from '../CityWeatherCurrentItem/CityWeatherCurrentItem';
import { CityWeatherDailyItem } from '../CityWeatherDailyItem/CityWeatherDailyItem';
import { animationDuration, dateOptions } from '../cityWeatherSettings';
import { WarningScreenItem } from '../../WarningScreenItem/WarningScreenItem';

export const CityWeatherItem = () => {
  const { currentCity, weatherSettings, refetchHome } = useSelector((state: RootState) => state.general);
  
  const {isLoading, data: weather, error} = useGetWeather(currentCity.cityName, weatherSettings, refetchHome);
  
  const [imageSource, setImageSource] = useState<ImageProps>(require('../../../assets/images/weather-icons/not-found.png'));
  const [weatherHourly, setWeatherHourly] = useState<OpenMeteoDataHourly[]>([]);
  const [dailyWeather, setDailyWeather] = useState<OpenMeteoDataForecast[]>([]);
  const [currentDayCursor, setCurrentDayCursor] = useState(0);
  const [showElt, setShowElt] = useState<boolean>(true);
  const [itemWidth, setItemWidth] = useState(20);

  const date = new Date();
  const scrollViewRef = useRef<ScrollView>(null);

  const onSwipeLeft = () => {
      setCurrentDayCursor((old) => {
        if (old + 1 < dailyWeather.length) {
          setShowElt(false);
          setTimeout(() => {
            setCurrentDayCursor(old + 1);
            setShowElt(true);
          }, animationDuration);
        } 
        return old;
      })
  }

  const onSwipeRight = () => {
      setCurrentDayCursor((old) => {
        if (old - 1 >= 0) {
          setShowElt(false);
          setTimeout(() => {
            setCurrentDayCursor(old - 1);
            setShowElt(true);
          }, animationDuration);
        } 
        return old;
      })
  }
  
  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 50);


  const currentDateText = date.toLocaleDateString('fr-FR', dateOptions);

  const updateHourlyWeather = () => {
    if (!isLoading && weather) {
      const weatherDate = Object.values(weather.forecast)[currentDayCursor].weather.date;
      const currNextHourly = currentDayCursor === 0 ? weather.forecast[weatherDate].hourly.filter((hourly) => {
        const hour = hourly.hour.split(':')[0];
        return +hour > date.getHours() || +hour > 19;
      }) : weather.forecast[weatherDate].hourly;

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
      const scrollTo = currentDayCursor === 0 ? 0 : (itemWidth + 10) * weatherSettings.startDailyHour;
      scrollViewRef.current.scrollTo({ x: scrollTo, animated: true });
    }
  }, [isLoading, weather, weatherSettings, currentDayCursor]);

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
        onTouchStart={onTouchStart} 
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        { isLoading || error ?
            <WarningScreenItem
              type={isLoading ? 'loader' : 'error'}
            />
            : weather && dailyWeather.length > 0
              ? currentDayCursor === 0 ? 
                <CityWeatherCurrentItem 
                  imageSource={imageSource}
                  currentDateText={currentDateText}
                  weather={weather.current}
                  show={showElt}
                />
                : <CityWeatherDailyItem 
                    weather={dailyWeather[currentDayCursor]?.weather} 
                    show={showElt}
                  />
              : !weather?.current ?? 
                <WarningScreenItem
                  type='unavailable'
                >
                  No weather data available.
                </WarningScreenItem> 
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
