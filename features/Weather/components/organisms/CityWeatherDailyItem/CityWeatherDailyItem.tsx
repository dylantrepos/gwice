import { useEffect, useRef, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, View } from 'react-native';
import {
  getAnimatedWeatherArray,
  getFormatedDate
} from '../../../../../modules/CityWeather/utils/utils';
import { weatherCodeIcons } from '../../../../../modules/CityWeather/utils/weatherImgCode';
import { type OpenMeteoDataDaily } from '../../../../../types/Weather';
import style from '../../../styles/organisms/CityWeatherDaiIyItem.style';
import { cityWeatherInfoElements } from '../cityWeatherInfoElements';
import {
  animationBounceOptions,
  animationDurationStaggIn,
  animationDurationStaggOut,
  animationDurationStaggerIn,
  animationDurationStaggerOut,
  animationOptions,
  bounceTranslateY
} from '../cityWeatherSettings';

interface Props {
  weather: OpenMeteoDataDaily;
  show: boolean;
}

export const CityWeatherDailyItem = ({ weather, show }: Props): ReactNode => {
  const { temperatureMin, temperatureMax, windSpeed, precipitation, time } = weather;
  const { windSpeedItem, precipitationItem, temperatureMinMaxItem, dateItem } =
    cityWeatherInfoElements;
  const { t } = useTranslation();

  const fade = useRef(new Animated.Value(0)).current;
  const fadeDate = useRef(new Animated.Value(0)).current;
  const fadeTemperature = useRef(new Animated.Value(0)).current;
  const fadePrecipitation = useRef(new Animated.Value(0)).current;
  const fadeWind = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;
  const translateY = bounceValue.interpolate(bounceTranslateY);

  const startBounceAnimation = (): void => {
    Animated.loop(Animated.timing(bounceValue, animationBounceOptions)).start();
  };

  const fadeAnimElements = [fadeDate, fadeTemperature, fadePrecipitation, fadeWind];

  const fadeIn = (): void => {
    const animatedArray = getAnimatedWeatherArray('in', animationDurationStaggIn, fadeAnimElements);
    Animated.timing(fade, animationOptions(1)).start();
    Animated.stagger(animationDurationStaggerIn, animatedArray).start();
  };
  const fadeOut = (): void => {
    const animatedArray = getAnimatedWeatherArray(
      'out',
      animationDurationStaggOut,
      fadeAnimElements
    );
    Animated.timing(fade, animationOptions(0)).start();
    Animated.stagger(animationDurationStaggerOut, animatedArray).start();
  };

  useEffect(() => {
    show ? fadeIn() : fadeOut();
  }, [show]);

  useEffect(() => {
    startBounceAnimation();
  }, []);

  return (
    <View style={style.cityWeather}>
      <Animated.View
        style={{
          ...style.cityAnimated,
          opacity: fade,
          transform: [{ translateY }]
        }}
      >
        <Image source={weatherCodeIcons.day[weather.weatherCode]} style={style.image} />
      </Animated.View>
      <View style={style.cityWeatherInfo}>
        {dateItem.component(getFormatedDate(time, t('dateLocale')), fadeDate)}
        {temperatureMinMaxItem.component(temperatureMin, temperatureMax, fadeTemperature)}
        {precipitationItem.component(precipitation, fadePrecipitation)}
        {windSpeedItem.component(windSpeed, fadeWind)}
      </View>
    </View>
  );
};
