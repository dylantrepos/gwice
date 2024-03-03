import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

interface UseBackgroundColorLoading {
  backgroundColor: Animated.AnimatedInterpolation<string>;
}

export const useBackgroundColorLoading = (show: boolean): UseBackgroundColorLoading => {
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const [animation, setAnimation] = useState(
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundColorAnim, {
          toValue: 0.33,
          duration: 750,
          useNativeDriver: false
        }),
        Animated.timing(backgroundColorAnim, {
          toValue: 0.66,
          duration: 750,
          useNativeDriver: false
        }),
        Animated.timing(backgroundColorAnim, {
          toValue: 1,
          duration: 750,
          useNativeDriver: false
        }),
        Animated.timing(backgroundColorAnim, {
          toValue: 0,
          duration: 750,
          useNativeDriver: false
        })
      ]),
      {
        iterations: -1
      }
    )
  );

  useEffect(() => {
    if (show) {
      animation.start();
    } else {
      animation.stop();
      backgroundColorAnim.setValue(0);
    }
  }, []);

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 0.33, 0.66, 1],
    outputRange: ['#E7F4FB', '#EBE7FB', '#E7FBF7', '#FBF9E7']
  });

  return {
    backgroundColor
  };
};
