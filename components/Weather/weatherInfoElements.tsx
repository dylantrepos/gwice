import { Wind, CloudRainWind, Thermometer } from 'lucide-react-native';
import { fadeTranslateX, iconSettings as icon } from "./weatherSettings";
import { Animated, Text } from 'react-native';
import style from './Weather.style';
import { PropsWithChildren } from 'react';

export const WeatherInfoElements = {
  dateItem: {
    title: 'Date',
    component: (date: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <Text style={style.cityWeatherDate}>{ date }</Text>
      </WeatherInfoDetail>
    ),
  },
  windSpeedItem: {
    title: 'Wind',
    component: (windSpeed: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <Wind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <Text>{ windSpeed }</Text>
      </WeatherInfoDetail>
    ),
  },
  precipitationItem: {
    title: 'Precipitation',
    component: (precipitation: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <CloudRainWind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <Text>{ precipitation }</Text>
      </WeatherInfoDetail>
    ),
  },
  temperatureMinMaxItem: {
    title: 'TemperatureMinMax',
    component: (min: string, max: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <Thermometer color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <Text style={style.cityWeatherTempMin}>{min}</Text>
        <Text>|</Text>
        <Text style={style.cityWeatherTempMax}>{max}</Text>
      </WeatherInfoDetail>
    ),
  },
  temperatureItem: {
    title: 'Temperature',
    component: (temperature: string, fadeAnim: Animated.Value) => (
      <WeatherInfoDetail fadeAnim={fadeAnim}>
        <Thermometer color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
        <Text>{ temperature }</Text>
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