import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, FlatList, View, type ImageProps } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useBackgroundColorLoading } from '../../../hooks/useBackgroundColorLoading';
import useGetWeather from '../../../hooks/useGetWeather';
import { useSwipe } from '../../../hooks/useSwap';
import { weatherCodeIcons } from '../../../modules/CityWeather/utils/weatherImgCode';
import { setCurrentHomeViewDate } from '../../../reducers/generalReducer';
import { type RootState } from '../../../store/store';
import { type OpenMeteoDataForecast, type OpenMeteoDataHourly } from '../../../types/Weather';
import { WarningScreenItem } from '../../WarningScreenItem/WarningScreenItem';
import { CityWeatherCurrentItem } from '../CityWeatherCurrentItem/CityWeatherCurrentItem';
import { CityWeatherDailyItem } from '../CityWeatherDailyItem/CityWeatherDailyItem';
import {
  CityWeatherHourlyEmptyItem,
  CityWeatherHourlyItem
} from '../CityWeatherHourlyItem/CityWeatherHourlyItem';
import { animationDuration, dateOptions } from '../cityWeatherSettings';
import style from './CityWeatherItem.style';

interface CityWeatherItemRenderProps {
  item: any;
  index: number;
}

export const CityWeatherItem = (): ReactNode => {
  const { currentCity, currentHomeViewDate, weatherSettings, refetchHome } = useSelector(
    (state: RootState) => state.generalReducer
  );

  const {
    isLoading,
    data: weather,
    error
  } = useGetWeather(currentCity.cityName, weatherSettings, refetchHome);

  const [imageSource, setImageSource] = useState<ImageProps>(
    require('../../../assets/images/weather-icons/not-found.png') // eslint-disable-line
  );
  const [weatherHourly, setWeatherHourly] = useState<OpenMeteoDataHourly[]>([]);
  const [dailyWeather, setDailyWeather] = useState<OpenMeteoDataForecast[]>([]);
  const [currentDayCursor, setCurrentDayCursor] = useState(0);
  const [showElt, setShowElt] = useState<boolean>(true);
  const [itemWidth, setItemWidth] = useState(20);
  const fakeWaitingData = Array(4)
    .fill(0)
    .map((_, index) => index);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const date = new Date();
  const scrollViewRef = useRef<FlatList>(null);

  const { backgroundColor } = useBackgroundColorLoading(isLoading);

  const onSwipeLeft = (): number => {
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
    });
  };

  const onSwipeRight = (): number => {
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
    });
  };

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 50);

  const currentDateText = date.toLocaleDateString(t('dateLocale'), dateOptions);

  const updateHourlyWeather = (): void => {
    if (!isLoading && weather) {
      const weatherDate = Object.values(weather.forecast)[currentDayCursor].weather.date;
      const currNextHourly =
        currentDayCursor === 0
          ? weather.forecast[weatherDate].hourly.filter((hourly) => {
              const hour = hourly.hour.split(':')[0];
              return +hour > date.getHours() || +hour > 19;
            })
          : weather.forecast[weatherDate].hourly;

      setWeatherHourly(currNextHourly);
    }
  };

  useEffect(() => {
    if (!isLoading && weather) {
      const forecast = Object.values(weather.forecast);
      setDailyWeather(forecast);
      updateHourlyWeather();

      setImageSource(
        weatherCodeIcons[weather.current.isDay ? 'day' : 'night'][weather.current.weatherCode]
      );
    }
    if (scrollViewRef.current) {
      const scrollTo =
        currentDayCursor === 0 ? 0 : (itemWidth + 10) * weatherSettings.startDailyHour;
      scrollViewRef.current.scrollToOffset({ offset: scrollTo, animated: true });
    }
  }, [isLoading, weather, weatherSettings, currentDayCursor]);

  const CityWeatherItemRender = useCallback(
    ({ item, index }: CityWeatherItemRenderProps) =>
      !isLoading && weatherHourly?.length > 0 ? (
        <CityWeatherHourlyItem
          weather={item}
          show={showElt}
          styles={{
            width: itemWidth,
            height: '100%'
          }}
        />
      ) : (
        <CityWeatherHourlyEmptyItem />
      ),
    [weatherHourly]
  );

  const { colors } = useTheme();

  return (
    <View
      style={style.cityWeatherItem}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setItemWidth(Math.round((Math.round(width) - 3 * 10) / 4));
      }}
    >
      <Animated.View
        style={{
          ...style.cityWeatherLargeContainer,
          backgroundColor: isLoading ? backgroundColor : colors.card
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {error ? (
          <WarningScreenItem type={'error'} />
        ) : !isLoading && weather && dailyWeather.length > 0 ? (
          currentDayCursor === 0 ? (
            <CityWeatherCurrentItem
              imageSource={imageSource}
              currentDateText={currentDateText}
              weather={weather.current}
              show={showElt}
            />
          ) : (
            <CityWeatherDailyItem
              weather={dailyWeather[currentDayCursor]?.weather}
              show={showElt}
            />
          )
        ) : (
          !weather?.current ?? (
            <WarningScreenItem type="unavailable">Module météo indisponible.</WarningScreenItem>
          )
        )}
      </Animated.View>
      <FlatList
        data={!isLoading ? weatherHourly : fakeWaitingData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={CityWeatherItemRender}
        horizontal={true}
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        alwaysBounceHorizontal={false}
        snapToInterval={itemWidth + 10}
        contentContainerStyle={{
          columnGap: 10,
          height: 120
        }}
        style={style.cityWeatherListSmall}
      />
    </View>
  );
};
