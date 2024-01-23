import { View, Image, Text, Animated, StyleProp, StyleSheetProperties, ViewStyle} from 'react-native';
import { weatherCodeIcons } from '../../../utils/weatherImgCode';
import style from './CityWeatherHourlyItem.style';
import { OpenMeteoDataHourly} from '../../../types/Weather';
import { useEffect, useRef } from 'react';
import { animationOptions } from '../weatherSettings';

type Props = {
  weather: OpenMeteoDataHourly;
  show: boolean;
  styleProps?: ViewStyle;
}

export const CityWeatherHourlyItem = ({
  weather,
  show,
  styleProps
}: Props) => {
  const { temperature, hour, weatherCode, isDay, date } = weather;
  const imageSource = weatherCodeIcons[isDay ? 'day' : 'night'][weatherCode];
  const fade = useRef(new Animated.Value(0)).current;


  const fadeIn = () => {
    Animated.timing(fade, animationOptions(1)).start();
  }
  const fadeOut = () => {
    Animated.timing(fade, animationOptions(0)).start();
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
    <View style={{...style.cityWeatherHourlyContainer, ...styleProps}}>
      <Animated.View style={{
        ...style.cityWeatherHourlyContainerAnimated,
        opacity: opacity
        }}>
        <Text style={style.cityWeatherHourlyTextHour}>{hour}</Text>
        <Image source={imageSource} style={style.cityWeatherHourlyImage} />
        <Text style={style.cityWeatherHourlyTextTitle}>{temperature}</Text>
        <View style={style.halfBottomBorder} />
      </Animated.View>
    </View>
  );
}
