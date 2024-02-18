import { Wind, CloudRainWind, Thermometer } from 'lucide-react-native';
import { fadeTranslateX, iconSettings as icon } from "./cityWeatherSettings";
import { Animated } from 'react-native';

import style from './cityWeather.style';
import { PropsWithChildren } from 'react';
import { TextItem } from '../../../components/TextItem/TextItem';
import { IconItem } from '../../../components/IconItem/IconItem';

export const cityWeatherInfoElements = {
  dateItem: {
    title: 'Date',
    component: (date: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <TextItem 
          weight="regular"
          size="md"
        >
          { date }
        </TextItem>
      </CityWeatherInfoDetail>
    ),
  },
  windSpeedItem: {
    title: 'Wind',
    component: (windSpeed: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <IconItem
          IconElt={Wind}
          size={'sm'}
          stroke={'light'}
        />
        <TextItem>
          { windSpeed }
        </TextItem>
      </CityWeatherInfoDetail>
    ),
  },
  precipitationItem: {
    title: 'Precipitation',
    component: (precipitation: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <IconItem
          IconElt={CloudRainWind}
          size={'sm'}
          stroke={'light'}
        />
        <TextItem>{ precipitation }</TextItem>
      </CityWeatherInfoDetail>
    ),
  },
  temperatureMinMaxItem: {
    title: 'TemperatureMinMax',
    component: (min: string, max: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
         <IconItem
          IconElt={Thermometer}
          size={'sm'}
          stroke={'light'}
        />
        <TextItem style={style.cityWeatherTempMin}>{min}</TextItem>
        <TextItem>|</TextItem>
        <TextItem style={style.cityWeatherTempMax}>{max}</TextItem>
      </CityWeatherInfoDetail>
    ),
  },
  temperatureItem: {
    title: 'Temperature',
    component: (temperature: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
         <IconItem
          IconElt={Thermometer}
          size={'sm'}
          stroke={'light'}
        />
        <TextItem>{ temperature }</TextItem>
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