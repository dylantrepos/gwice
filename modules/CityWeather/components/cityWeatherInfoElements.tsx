import { Wind, CloudRainWind, Thermometer } from 'lucide-react-native';
import { fadeTranslateX, iconSettings as icon } from "./cityWeatherSettings";
import { Animated } from 'react-native';

import style from './cityWeather.style';
import { PropsWithChildren } from 'react';
import { TextItem } from '../../../components/TextItem/TextItem';

export const cityWeatherInfoElements = {
  dateItem: {
    title: 'Date',
    component: (date: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <TextItem weight='500' styles={style.cityWeatherDate}>{ date }</TextItem>
      </CityWeatherInfoDetail>
    ),
  },
  windSpeedItem: {
    title: 'Wind',
    component: (windSpeed: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <Wind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <TextItem styles={style.cityWeatherInfoDetailText}>{ windSpeed }</TextItem>
      </CityWeatherInfoDetail>
    ),
  },
  precipitationItem: {
    title: 'Precipitation',
    component: (precipitation: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <CloudRainWind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <TextItem styles={style.cityWeatherInfoDetailText}>{ precipitation }</TextItem>
      </CityWeatherInfoDetail>
    ),
  },
  temperatureMinMaxItem: {
    title: 'TemperatureMinMax',
    component: (min: string, max: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <Thermometer color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <TextItem styles={style.cityWeatherTempMin}>{min}</TextItem>
        <TextItem>|</TextItem>
        <TextItem styles={style.cityWeatherTempMax}>{max}</TextItem>
      </CityWeatherInfoDetail>
    ),
  },
  temperatureItem: {
    title: 'Temperature',
    component: (temperature: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <Thermometer color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <TextItem styles={style.cityWeatherInfoDetailText}>{ temperature }</TextItem>
      </CityWeatherInfoDetail>
    ),
  }, 
}

export const CityWeatherInfoDetail = ({
  fadeAnim, 
  children
}: PropsWithChildren<{fadeAnim: Animated.Value}>) => (
  <Animated.View 
    style={{
      ...style.cityWeatherInfoDetail,
      opacity: fadeAnim,
      transform: [{ translateX: fadeAnim.interpolate(fadeTranslateX) }],
    }}
  >
    { children }
  </Animated.View>
)