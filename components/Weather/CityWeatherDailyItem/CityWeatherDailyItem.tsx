import { View, Image, Text, Animated, Easing } from 'react-native';
import style from './CityWeatherDaiIyItem.style';
import { OpenMeteoDataDaily } from '../../../types/Weather';
import { weatherCodeIcons } from '../../../utils/weatherImgCode';
import { Thermometer, Wind, CloudRainWind } from 'lucide-react-native';
import { animationDurationStaggIn, animationDurationStaggOut,  animationDurationStaggerIn, animationDurationStaggerOut, animationOptions, dateOptions, iconSettings as icon } from '../weatherSettings';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { useEffect, useRef } from 'react';


type Props = {
  weather: OpenMeteoDataDaily;
  show: boolean;
}

export const CityWeatherDailyItem = ({
  weather,
  show
}: Props) => {
  const { temperatureMin, temperatureMax, windSpeed, precipitation, time } = weather;
  const dateFormatted = new Date(time);
  const formattedDate = dateFormatted.toLocaleDateString('fr-FR', dateOptions);
  const fade = useRef(new Animated.Value(0)).current;
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;


  const fadeIn = () => {
    Animated.timing(fade, animationOptions(1)).start();
    Animated.stagger(animationDurationStaggerIn, [
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: animationDurationStaggIn,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: animationDurationStaggIn,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: animationDurationStaggIn,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(fadeAnim4, {
        toValue: 1,
        duration: animationDurationStaggIn,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
    ]).start();
  }
  const fadeOut = () => {
    Animated.timing(fade, animationOptions(0)).start();
    Animated.stagger(animationDurationStaggerOut, [
      Animated.timing(fadeAnim1, {
        toValue: 0,
        duration: animationDurationStaggOut,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 0,
        duration: animationDurationStaggOut,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim3, {
        toValue: 0,
        duration: animationDurationStaggOut,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim4, {
        toValue: 0,
        duration: animationDurationStaggOut,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const opacity = fade.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    if (show) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [show]);

  return (
    <View style={style.cityWeather}> 
      <Animated.View 
        style={{
          ...style.cityAnimated,
          opacity
        }} 
      >
        <Image 
          source={weatherCodeIcons.day[weather.weatherCode]} 
          style={style.image} 
        />
      </Animated.View>
      <View style={style.cityWeatherInfo}>
        <Animated.View style={{opacity: fade}}>
          <Text style={style.cityWeatherDate}>{capitalizeFirstLetter(formattedDate)}</Text>
        </Animated.View>
        <Animated.View 
            style={{
              ...style.cityWeatherInfoDetail,
              opacity: fadeAnim2,
              transform: [
                {
                  translateX: fadeAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 1],
                  }),
                },
              ],
            }}
        >
          <Thermometer color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
          <View style={style.cityWeatherTemp}> 
            <Text style={style.cityWeatherTempMin}>{temperatureMin}</Text>
            <Text>|</Text>
            <Text style={style.cityWeatherTempMax}>{temperatureMax}</Text>
          </View>
        </Animated.View>
        <Animated.View 
            style={{
              ...style.cityWeatherInfoDetail,
              opacity: fadeAnim3,
              transform: [
                {
                  translateX: fadeAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 1],
                  }),
                },
              ],
            }}>
          <CloudRainWind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
          <Text> {precipitation}</Text>
        </Animated.View>
        <Animated.View 
            style={{
              ...style.cityWeatherInfoDetail,
              opacity: fadeAnim4,
              transform: [
                {
                  translateX: fadeAnim4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-10, 1],
                  }),
                },
              ],
            }}>
          <Wind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
          <Text> {windSpeed}</Text>
        </Animated.View>
      </View> 
    </View>
  )
};
