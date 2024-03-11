import { Animated } from 'react-native';
import { dateOptions } from '../../../components/cityWeather/cityWeatherSettings';
import { capitalizeFirstLetter } from '../../../utils/utils';

export const getFormatedDate = (date: string, locale: string) =>
  capitalizeFirstLetter(new Date(date).toLocaleDateString(locale, dateOptions));

export const getAnimatedWeatherArray = (
  toValue: 'in' | 'out',
  duration: number,
  animatedElements: Animated.Value[]
) =>
  animatedElements.map((anim) =>
    Animated.timing(anim, {
      toValue: toValue === 'in' ? 1 : 0,
      duration,
      useNativeDriver: true
    })
  );
