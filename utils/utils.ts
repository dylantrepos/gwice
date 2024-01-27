import { Animated } from 'react-native';
import { dateOptions } from '../components/Weather/weatherSettings';

export const capitalizeFirstLetter = (string: string) => { 
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getFormatedDate = (date: string) => {
  return capitalizeFirstLetter((new Date(date)).toLocaleDateString('fr-FR', dateOptions));
}

export const getAnimatedWeatherArray = (toValue: 'in' | 'out', duration: number, animatedElements: Animated.Value[]) => {
  return animatedElements.map(anim => {
    return Animated.timing(anim, {
      toValue: toValue === 'in' ? 1 : 0,
      duration,
      useNativeDriver: true,
    })
  })
}

export const limitTitleLength = (title: string, maxWords: number = 10) => {
  const words = title.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return title;
};
