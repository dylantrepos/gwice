import { useEffect, useRef, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, View, type ImageProps } from 'react-native';
import { TextItem } from '../../../../components/atoms/TextItem';
import { capitalizeFirstLetter } from '../../../../utils/utils';
import style from '../../styles/organisms/LargeWeatherItem.style';
import { type OpenMeteoDataCurrent, type OpenMeteoDataDaily } from '../../types/Weather';
import { getAnimatedWeatherArray, getFormatedDate } from '../../utils/utils';
import { weatherCodeIcons } from '../../utils/weatherImgCode';
import { CityWeatherInfoDetail, cityWeatherInfoElements } from './cityWeatherInfoElements';
import {
  animationBounceOptions,
  animationDurationStaggIn,
  animationDurationStaggOut,
  animationDurationStaggerIn,
  animationDurationStaggerOut,
  animationOptions,
  bounceTranslateY
} from './cityWeatherSettings';

interface Props {
  imageSource: ImageProps | null;
  weather: OpenMeteoDataCurrent | OpenMeteoDataDaily;
  currentDateText: string | null;
  show: boolean;
}

export const LargeWeatherItem = ({
  imageSource,
  currentDateText,
  weather,
  show
}: Props): ReactNode => {
  const { temperature, windSpeed, precipitation, time } = weather;
  const { windSpeedItem, precipitationItem, temperatureItem, temperatureMinMaxItem, dateItem } =
    cityWeatherInfoElements;

  const fade = useRef(new Animated.Value(0)).current;
  const fadeDate = useRef(new Animated.Value(0)).current;
  const fadeTemperature = useRef(new Animated.Value(0)).current;
  const fadePrecipitation = useRef(new Animated.Value(0)).current;
  const fadeWind = useRef(new Animated.Value(0)).current;
  const fadeAnimElements = [fadeDate, fadeTemperature, fadePrecipitation, fadeWind];
  const bounceValue = useRef(new Animated.Value(0)).current;
  const translateY = bounceValue.interpolate(bounceTranslateY);
  const { t } = useTranslation();

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
    <View
      style={{
        ...style.cityWeather
        // height: 150
      }}
    >
      <CityWeatherInfoDetail fadeAnim={fadeDate}>
        <TextItem weight="regular" size="6xl" color="white">
          {capitalizeFirstLetter(currentDateText ?? getFormatedDate(time, t('dateLocale')))}
        </TextItem>
      </CityWeatherInfoDetail>

      <View style={style.cityImageInfo}>
        <Animated.View
          style={{
            ...style.cityAnimated,
            opacity: fade,
            transform: [{ translateY }]
          }}
        >
          <Image
            source={imageSource ?? weatherCodeIcons.day[weather.weatherCode]}
            style={style.image}
          />
        </Animated.View>
        <View style={style.cityWeatherInfo}>
          {imageSource
            ? temperatureItem.component(temperature as string, fadeTemperature)
            : temperatureMinMaxItem.component(
                (weather as OpenMeteoDataDaily).temperatureMin,
                (weather as OpenMeteoDataDaily).temperatureMax,
                fadeTemperature
              )}
          {/* {precipitationItem.component(precipitation, fadePrecipitation)}
          {windSpeedItem.component(windSpeed, fadeWind)} */}
        </View>
      </View>
    </View>
  );
};
