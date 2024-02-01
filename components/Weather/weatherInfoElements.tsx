import { Wind, CloudRainWind, Thermometer } from 'lucide-react-native';
import { fadeTranslateX, iconSettings as icon } from "./weatherSettings";
import { Animated } from 'react-native';
import { Text } from '../Text/Text';
import style from './Weather.style';
import { PropsWithChildren } from 'react';

export const WeatherInfoElements = {
  dateItem: {
    title: 'Date',
    component: (date: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <Text weight='500' styles={style.cityWeatherDate}>{ date }</Text>
      </WeatherInfoDetail>
    ),
  },
  windSpeedItem: {
    title: 'Wind',
    component: (windSpeed: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <Wind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <Text styles={style.cityWeatherInfoDetailText}>{ windSpeed }</Text>
      </WeatherInfoDetail>
    ),
  },
  precipitationItem: {
    title: 'Precipitation',
    component: (precipitation: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <CloudRainWind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <Text styles={style.cityWeatherInfoDetailText}>{ precipitation }</Text>
      </WeatherInfoDetail>
    ),
  },
  temperatureMinMaxItem: {
    title: 'TemperatureMinMax',
    component: (min: string, max: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <Thermometer color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <Text styles={style.cityWeatherTempMin}>{min}</Text>
        <Text>|</Text>
        <Text styles={style.cityWeatherTempMax}>{max}</Text>
      </WeatherInfoDetail>
    ),
  },
  temperatureItem: {
    title: 'Temperature',
    component: (temperature: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <Thermometer color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <Text styles={style.cityWeatherInfoDetailText}>{ temperature }</Text>
      </WeatherInfoDetail>
    ),
  }, 
}

export const WeatherInfoDetail = ({
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