import { View, Image, ImageProps, Animated } from 'react-native';
import style from './CityWeatherCurrentItem.style';
import { OpenMeteoDataCurrent } from '../../../types/Weather';
import { animationDurationStaggIn, animationDurationStaggOut,  animationDurationStaggerIn, animationDurationStaggerOut, animationOptions } from '../weatherSettings';
import { capitalizeFirstLetter, getAnimatedWeatherArray } from '../../../utils/utils';
import { useEffect, useRef } from 'react';
import { WeatherInfoElements } from '../weatherInfoElements';

type Props = {
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
}: Props) => {
  const { temperature, windSpeed, precipitation } = weather;
  const { windSpeedItem, precipitationItem, temperatureItem, dateItem } = WeatherInfoElements;

  const fade = useRef(new Animated.Value(0)).current;
  const fadeDate = useRef(new Animated.Value(0)).current;
  const fadeTemperature = useRef(new Animated.Value(0)).current;
  const fadePrecipitation = useRef(new Animated.Value(0)).current;
  const fadeWind = useRef(new Animated.Value(0)).current;
  const fadeAnimElements = [fadeDate, fadeTemperature, fadePrecipitation, fadeWind];

  const fadeIn = () => {
    const animatedArray = getAnimatedWeatherArray('in', animationDurationStaggIn, fadeAnimElements)
    Animated.timing(fade, animationOptions(1)).start();
    Animated.stagger(animationDurationStaggerIn, animatedArray).start();
  }
  const fadeOut = () => {
    const animatedArray = getAnimatedWeatherArray('out', animationDurationStaggOut, fadeAnimElements)
    Animated.timing(fade, animationOptions(0)).start();
    Animated.stagger(animationDurationStaggerOut, animatedArray).start();
  }

  useEffect(() => {
    show ? fadeIn() : fadeOut();
  }, [show]);

  

  return (
    <View style={style.cityWeather}>
      <Animated.View 
        style={{
          ...style.cityAnimated,
          opacity: fade,
        }} 
      >
        <Image 
          source={imageSource} 
          style={style.image} 
        />
      </Animated.View> 
      <View style={style.cityWeatherInfo}>
        {dateItem.component(capitalizeFirstLetter(currentDateText), fadeDate)}
        {temperatureItem.component(temperature, fadeTemperature)}
        {precipitationItem.component(precipitation, fadePrecipitation)}
        {windSpeedItem.component(windSpeed, fadeWind)}
      </View> 
    </View>
  )
};
