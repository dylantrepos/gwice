import { Easing, type Animated } from 'react-native';

export const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'short',
  day: 'numeric'
};

export const iconSettings = {
  size: 24,
  color: '#5C5C5C',
  strokeWidth: 1
};

export const animationDuration = 250;
export const animationDurationStaggerIn = 100;
export const animationDurationStaggerOut = 10;
export const animationDurationStaggIn = 100;
export const animationDurationStaggOut = 20;

export const fadeRange = {
  inputRange: [0, 1],
  outputRange: [0, 1]
};

export const fadeTranslateX = {
  inputRange: [0, 1],
  outputRange: [-10, 1]
};

export const bounceTranslateY = {
  inputRange: [0, 0.5, 1],
  outputRange: [0.5, -0.5, 0.5]
};

export const animationOptions = (value: number) =>
  ({
    toValue: value,
    duration: animationDuration,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.linear)
  }) as Animated.TimingAnimationConfig;

export const animationBounceOptions = {
  toValue: 1,
  duration: 2500,
  useNativeDriver: true,
  easing: Easing.inOut(Easing.linear)
} as Animated.TimingAnimationConfig;
