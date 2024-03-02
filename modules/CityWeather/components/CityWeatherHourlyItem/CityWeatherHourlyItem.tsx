import { View, Image, Animated, ViewStyle, Dimensions} from 'react-native';
import { weatherCodeIcons } from '../../utils/weatherImgCode';
import style, { themeStyle } from './CityWeatherHourlyItem.style';
import { OpenMeteoDataHourly} from '../../types/Weather';
import { useEffect, useRef } from 'react';
import { animationOptions } from '../cityWeatherSettings';
import { useBackgroundColorLoading } from '../../../../hooks/useBackgroundColorLoading';
import { TextItem } from '../../../../components/TextItem/TextItem';
import { ViewItem } from '../../../../components/ViewItem/ViewItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

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
  const { theme } = useSelector((state: RootState) => state.generalReducer);

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
    <View 
      style={{...style.cityWeatherHourlyContainer, ...styleProps}}
    >
      <ViewItem.Animated 
        style={{
        ...style.cityWeatherHourlyContainerAnimated,
        opacity: opacity
        }}
      >
        <TextItem
          weight="regular"
          size="md"
        >
          {hour}
        </TextItem>
        <Image source={imageSource} style={style.cityWeatherHourlyImage} />
        <TextItem 
          weight="light"
          size="md"
        >
          {temperature}
        </TextItem>
        <View style={{
          ...style.halfBottomBorder,
          borderColor: themeStyle.halfBottomBorderColor['light'] as string,
        }} />
      </ViewItem.Animated>
    </View>
  );
}


export const CityWeatherHourlyEmptyItem = () => {


  const { backgroundColor } = useBackgroundColorLoading(true)
  
  return (
    <Animated.View 
      style={{
        ...style.cityWeatherHourlyEmptyContainer,
        height: '100%',
        width: ((Dimensions.get('window').width - 40) - (3 * 10)) / 4,
        backgroundColor,
      }}
    >
    </Animated.View>
  )
};
