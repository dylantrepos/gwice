import { View, Image, Animated } from 'react-native';
import style from './CityWeatherDaiIyItem.style';
import { OpenMeteoDataDaily } from '../../../types/Weather';
import { weatherCodeIcons } from '../../../utils/weatherImgCode';
import { animationDurationStaggIn, animationDurationStaggOut,  animationDurationStaggerIn, animationDurationStaggerOut, animationOptions } from '../weatherSettings';
import { getAnimatedWeatherArray, getFormatedDate } from '../../../utils/utils';
import { useEffect, useRef } from 'react';
import { WeatherInfoElements } from '../weatherInfoElements';

type Props = {
  weather: OpenMeteoDataDaily;
  show: boolean;
}

export const CityWeatherDailyItem = ({
  weather,
  show
}: Props) => {
  const { temperatureMin, temperatureMax, windSpeed, precipitation, time } = weather;
  const { windSpeedItem, precipitationItem, temperatureMinMaxItem, dateItem } = WeatherInfoElements;
  
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
