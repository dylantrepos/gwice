import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Image, View, type ImageProps } from 'react-native';
import { ViewItem } from '../../../../components/ViewItem/ViewItem';
import { capitalizeFirstLetter } from '../../../../utils/utils';
import { type OpenMeteoDataCurrent } from '../../types/Weather';
import { getAnimatedWeatherArray } from '../../utils/utils';
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
import style from './CityWeatherCurrentItem.style';

interface Props {
  imageSource: ImageProps;
  weather: OpenMeteoDataCurrent;
  currentDateText: string;
  show: boolean;
}

export const CityWeatherCurrentItem = ({
  imageSource,
  currentDateText,
  weather,
  show
}: Props): ReactNode => {
  const { temperature, windSpeed, precipitation } = weather;
  const { windSpeedItem, precipitationItem, temperatureItem, dateItem } = cityWeatherInfoElements;

  const fade = useRef(new Animated.Value(0)).current;
  const fadeDate = useRef(new Animated.Value(0)).current;
  const fadeTemperature = useRef(new Animated.Value(0)).current;
  const fadePrecipitation = useRef(new Animated.Value(0)).current;
  const fadeWind = useRef(new Animated.Value(0)).current;
  const fadeAnimElements = [fadeDate, fadeTemperature, fadePrecipitation, fadeWind];
  const bounceValue = useRef(new Animated.Value(0)).current;
  const translateY = bounceValue.interpolate(bounceTranslateY);

  const startBounceAnimation = (): void => {
    Animated.loop(Animated.timing(bounceValue, animationBounceOptions)).start();
  };

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
    <ViewItem
      style={{
        ...style.cityWeather,
        height: 150
      }}
    >
      <Animated.View
        style={{
          ...style.cityAnimated,
          opacity: fade,
          transform: [{ translateY }]
        }}
      >
        <Image source={imageSource} style={style.image} />
      </Animated.View>
      <View style={style.cityWeatherInfo}>
        {dateItem.component(capitalizeFirstLetter(currentDateText), fadeDate)}
        {temperatureItem.component(temperature, fadeTemperature)}
        {precipitationItem.component(precipitation, fadePrecipitation)}
        {windSpeedItem.component(windSpeed, fadeWind)}
      </View>
    </ViewItem>
  );
};
