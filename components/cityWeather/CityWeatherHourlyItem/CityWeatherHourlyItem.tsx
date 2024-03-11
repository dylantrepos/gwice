import { useTheme } from '@react-navigation/native';
import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Dimensions, Image, View, type ViewStyle } from 'react-native';
import { useBackgroundColorLoading } from '../../../hooks/useBackgroundColorLoading';
import { weatherCodeIcons } from '../../../modules/CityWeather/utils/weatherImgCode';
import { type OpenMeteoDataHourly } from '../../../types/Weather';
import { TextItem } from '../../general/TextItem/TextItem';
import { animationOptions } from '../cityWeatherSettings';
import style from './CityWeatherHourlyItem.style';

interface Props {
  weather: OpenMeteoDataHourly;
  show: boolean;
  styles?: ViewStyle;
}

export const CityWeatherHourlyItem = ({ weather, show, styles }: Props): ReactNode => {
  const { temperature, hour, weatherCode, isDay } = weather;
  const imageSource = weatherCodeIcons[isDay ? 'day' : 'night'][weatherCode];
  const fade = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();

  const fadeIn = (): void => {
    Animated.timing(fade, animationOptions(1)).start();
  };
  const fadeOut = (): void => {
    Animated.timing(fade, animationOptions(0)).start();
  };

  const opacity = fade.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  useEffect(() => {
    if (show) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [show]);

  return (
    <View style={{ ...style.cityWeatherHourlyContainer, ...styles }}>
      <Animated.View
        style={{
          ...style.cityWeatherHourlyContainerAnimated,
          backgroundColor: colors.card,
          opacity
        }}
      >
        <TextItem weight="regular" size="md">
          {hour}
        </TextItem>
        <Image source={imageSource} style={style.cityWeatherHourlyImage} />
        <TextItem weight="light" size="md">
          {temperature}
        </TextItem>
        <View
          style={{
            ...style.halfBottomBorder,
            borderColor: colors.border
          }}
        />
      </Animated.View>
    </View>
  );
};

export const CityWeatherHourlyEmptyItem = (): ReactNode => {
  const { backgroundColor } = useBackgroundColorLoading(true);

  return (
    <Animated.View
      style={{
        ...style.cityWeatherHourlyEmptyContainer,
        height: '100%',
        width: (Dimensions.get('window').width - 40 - 3 * 10) / 4,
        backgroundColor
      }}
    ></Animated.View>
  );
};
