import { View, Image, Animated } from 'react-native';
import style from './CityWeatherDaiIyItem.style';
import { OpenMeteoDataDaily } from '../../types/Weather';
import { weatherCodeIcons } from '../../utils/weatherImgCode';
import { animationBounceOptions, animationDurationStaggIn, animationDurationStaggOut,  animationDurationStaggerIn, animationDurationStaggerOut, animationOptions, bounceTranslateY } from '../cityWeatherSettings';
import { getAnimatedWeatherArray, getFormatedDate } from '../../utils/utils';
import { useEffect, useRef } from 'react';
import { cityWeatherInfoElements } from '../cityWeatherInfoElements';

type Props = {
  weather: OpenMeteoDataDaily;
  show: boolean;
}

export const CityWeatherDailyItem = ({
  weather,
  show
}: Props) => {
  const { temperatureMin, temperatureMax, windSpeed, precipitation, time } = weather;
  const { windSpeedItem, precipitationItem, temperatureMinMaxItem, dateItem } = cityWeatherInfoElements;
  
  const fade = useRef(new Animated.Value(0)).current;
  const fadeDate = useRef(new Animated.Value(0)).current;
  const fadeTemperature = useRef(new Animated.Value(0)).current;
  const fadePrecipitation = useRef(new Animated.Value(0)).current;
  const fadeWind = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;
  const translateY = bounceValue.interpolate(bounceTranslateY);

  const startBounceAnimation = () => {
    Animated.loop(
      Animated.timing(bounceValue, animationBounceOptions),
    ).start();
  };


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

  useEffect(() => {
    startBounceAnimation();
  }, []);

  return (
    <View style={style.cityWeather}> 
      <Animated.View 
        style={{
          ...style.cityAnimated,
          opacity: fade,
          transform: [
            { translateY: translateY }
          ]
        }} 
      >
        <Image 
          source={weatherCodeIcons.day[weather.weatherCode]} 
          style={style.image} 
        />
      </Animated.View>
      <View style={style.cityWeatherInfo}>
        {dateItem.component(getFormatedDate(time), fadeDate)}
        {temperatureMinMaxItem.component(temperatureMin, temperatureMax, fadeTemperature)}
        {precipitationItem.component(precipitation, fadePrecipitation)}
        {windSpeedItem.component(windSpeed, fadeWind)}
      </View> 
    </View>
  )
};
