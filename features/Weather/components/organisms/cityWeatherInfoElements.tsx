import { CloudRainWind, Thermometer, Wind } from 'lucide-react-native';
import { Animated } from 'react-native';
import { fadeTranslateX } from './cityWeatherSettings';

import { type PropsWithChildren } from 'react';
import { IconItem } from '../../../../components/atoms/IconItem';
import { TextItem } from '../../../../components/atoms/TextItem';
import palette from '../../../../theme/palette';
import style from '../../styles/cityWeather.style';

export const cityWeatherInfoElements = {
  dateItem: {
    title: 'Date',
    component: (date: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <TextItem weight="regular" size="md">
          {date}
        </TextItem>
      </CityWeatherInfoDetail>
    )
  },
  windSpeedItem: {
    title: 'Wind',
    component: (windSpeed: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <IconItem IconElt={Wind} size={'sm'} stroke={'light'} />
        <TextItem>{windSpeed}</TextItem>
      </CityWeatherInfoDetail>
    )
  },
  precipitationItem: {
    title: 'Precipitation',
    component: (precipitation: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <IconItem IconElt={CloudRainWind} size={'sm'} stroke={'light'} />
        <TextItem size="xl">{precipitation}</TextItem>
      </CityWeatherInfoDetail>
    )
  },
  temperatureMinMaxItem: {
    title: 'TemperatureMinMax',
    component: (min: string, max: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <IconItem IconElt={Thermometer} color={palette.whitePrimary} size={'md'} stroke={'light'} />
        <TextItem size="xl" style={style.cityWeatherTempMin}>
          {min}
        </TextItem>
        <TextItem color={palette.whitePrimary}>|</TextItem>
        <TextItem size="xl" style={style.cityWeatherTempMax}>
          {max}
        </TextItem>
      </CityWeatherInfoDetail>
    )
  },
  temperatureItem: {
    title: 'Temperature',
    component: (temperature: string, fadeAnim: Animated.Value) => (
      <CityWeatherInfoDetail fadeAnim={fadeAnim}>
        <IconItem IconElt={Thermometer} color={palette.whitePrimary} size={'md'} stroke={'light'} />
        <TextItem size="xl" color={palette.whitePrimary}>
          {temperature}
        </TextItem>
      </CityWeatherInfoDetail>
    )
  }
};

export const CityWeatherInfoDetail = ({
  fadeAnim,
  children
}: PropsWithChildren<{ fadeAnim: Animated.Value }>) => (
  <Animated.View
    style={{
      ...style.cityWeatherInfoDetail,
      opacity: fadeAnim,
      transform: [{ translateX: fadeAnim.interpolate(fadeTranslateX) }]
    }}
  >
    {children}
  </Animated.View>
);
