import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ImageProps, ScrollView, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { weatherCodeIcons } from '../../utils/weatherImgCode';
import style from './CityWeatherItem.style';
import useGetWeather from '../../hooks/useGetWeather';
import { OpenMeteoDataForecast, OpenMeteoDataHourly } from '../../types/Weather';
import { useSwipe } from '../../../../hooks/useSwap';
import { CityWeatherHourlyEmptyItem, CityWeatherHourlyItem } from '../CityWeatherHourlyItem/CityWeatherHourlyItem';
import { CityWeatherCurrentItem } from '../CityWeatherCurrentItem/CityWeatherCurrentItem';
import { CityWeatherDailyItem } from '../CityWeatherDailyItem/CityWeatherDailyItem';
import { animationDuration, dateOptions } from '../cityWeatherSettings';
import { useBackgroundColorLoading } from '../../../../hooks/useBackgroundColorLoading';
import { setCurrentHomeViewDate } from '../../../../reducers/generalReducer';
import moment from 'moment';
import { FlatList } from 'react-native';
import { WarningScreenItem } from '../../../../components/WarningScreenItem/WarningScreenItem';

type CityWeatherItemRenderProps = {
  item: any;
  index: number;
}

export const CityWeatherItem = () => {
  const { 
    currentCity, 
    currentHomeViewDate,
    weatherSettings, 
    refetchHome,
  } = useSelector((state: RootState) => state.generalReducer);
  
  const {isLoading, data: weather, error} = useGetWeather(currentCity.cityName, weatherSettings, refetchHome);
  
  const [imageSource, setImageSource] = useState<ImageProps>(require('../../assets/images/weather-icons/not-found.png'));
  const [weatherHourly, setWeatherHourly] = useState<OpenMeteoDataHourly[]>([]);
  const [dailyWeather, setDailyWeather] = useState<OpenMeteoDataForecast[]>([]);
  const [currentDayCursor, setCurrentDayCursor] = useState(0);
  const [showElt, setShowElt] = useState<boolean>(true);
  const [itemWidth, setItemWidth] = useState(20);
  const fakeWaitingData = Array(4).fill(0).map((_, index) => index);
  const dispatch = useDispatch();

  const date = new Date();
  const scrollViewRef = useRef<FlatList>(null);

  const {backgroundColor} = useBackgroundColorLoading(isLoading);

  const onSwipeLeft = () => {
    if (currentDayCursor + 1 < dailyWeather.length) {
      const nextDate = moment(currentHomeViewDate).add(1, 'days').toDate();
      dispatch(setCurrentHomeViewDate(nextDate.toISOString()));
    }
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
    if (currentDayCursor - 1 >= 0) {
      const dateBefore = moment(currentHomeViewDate).subtract(1, 'days').toDate();
      dispatch(setCurrentHomeViewDate(dateBefore.toISOString()));
    }
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
      scrollViewRef.current.scrollToOffset({ offset: scrollTo, animated: true });
    }
  }, [isLoading, weather, weatherSettings, currentDayCursor]);


  const CityWeatherItemRender = useCallback(({item, index}: CityWeatherItemRenderProps) => {

    return !isLoading && weatherHourly?.length > 0 
        ? <CityWeatherHourlyItem 
            weather={item} 
            show={showElt}
            styleProps={{
              width: itemWidth,
              height: '100%',
            }}
          />
        : <CityWeatherHourlyEmptyItem />
  }, [weatherHourly])

  return (
    <View
      style={style.cityWeatherItem}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setItemWidth(Math.round((Math.round(width) - (3 * 10)) / 4))
      }}
    >
      <Animated.View 
        style={{
          ...style.cityWeatherLargeContainer,
          backgroundColor: isLoading ? backgroundColor : 'white',
        }}
        onTouchStart={onTouchStart} 
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        { error ?
            <WarningScreenItem
              type={'error'}
            />
            : !isLoading && weather && dailyWeather.length > 0
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
                  Module météo indisponible.
                </WarningScreenItem> 
        }
      </Animated.View>
      <FlatList
        data={!isLoading ? weatherHourly : fakeWaitingData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={CityWeatherItemRender}
        horizontal={true}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        snapToAlignment='start'
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        snapToInterval={itemWidth + 10}
        contentContainerStyle={{
          columnGap: 10,
          height: 120,
        }}
        style={style.cityWeatherListSmall}
      />
    </View>
  )
};
