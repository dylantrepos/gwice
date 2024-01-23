import { View, Image, Text, ImageProps, Animated, Easing } from 'react-native';
import style from './CityWeatherCurrentItem.style';
import { OpenMeteoDataCurrent } from '../../../types/Weather';
import { Thermometer, CloudRainWind, Wind } from 'lucide-react-native';
import { animationDurationStaggIn, animationDurationStaggOut,  animationDurationStaggerIn, animationDurationStaggerOut, animationOptions, iconSettings as icon } from '../weatherSettings';
import { capitalizeFirstLetter } from '../../../utils/utils';
import { useEffect, useRef } from 'react';

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
  const { temperature, relativeHumidity, windSpeed, precipitation } = weather;

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
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: animationDurationStaggIn,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: animationDurationStaggIn,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim4, {
        toValue: 1,
        duration: animationDurationStaggIn,
        useNativeDriver: true,
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
          source={imageSource} 
          style={style.image} 
        />
      </Animated.View> 
      <View style={style.cityWeatherInfo}>
          <Animated.View style={{opacity: fadeAnim1}}>
            <Text style={style.cityWeatherDate}>{capitalizeFirstLetter(currentDateText)}</Text>
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
            <Text> {temperature} </Text>
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
            }}
          >
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
            }}
          >
            <Wind color={icon.color} size={icon.size} strokeWidth={icon.strokeWidth} />
            <Text> {windSpeed}</Text>
          </Animated.View>
      </View> 
    </View>
  )
};
