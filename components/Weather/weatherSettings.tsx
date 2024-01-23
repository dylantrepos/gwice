import { Animated, Easing } from "react-native";

export const dateOptions: Intl.DateTimeFormatOptions = { 
  weekday: 'long', 
  month: 'short', 
  day: 'numeric' 
};

export const iconSettings = {
  size: 24,
  color: '#5C5C5C',
  strokeWidth: 1,
}

export const animationDuration = 250;
export const animationDurationStaggerIn = 100;
export const animationDurationStaggerOut = 10;
export const animationDurationStaggIn = 100;
export const animationDurationStaggOut = 20;

export const animationOptions = (value: number) => ({
  toValue: value, 
  duration: animationDuration, 
  useNativeDriver: true, 
  easing: Easing.inOut(Easing.linear), 
} as Animated.TimingAnimationConfig)
