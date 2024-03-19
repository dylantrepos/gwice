import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, type ReactNode } from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { CityWeatherItem } from '../../features/Weather/components/organisms/CityWeatherItem/CityWeatherItem';
import { type RootState } from '../../store/store';
import style from '../../styles/components/molecules/CityBackgroundItem.style';

export const CityBackgroundItem = (): ReactNode => {
  const { currentCity, isWeatherLoaded } = useSelector((state: RootState) => state.generalReducer);

  const height = useSharedValue(Dimensions.get('window').height);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isWeatherLoaded) {
      height.value = withSpring(450, {
        damping: 100
      });
      opacity.value = withSpring(1, {
        damping: 100
      });
    }
  }, [isWeatherLoaded]);

  return (
    <Animated.View
      style={{
        ...style.container,
        height
      }}
    >
      <ImageBackground style={style.image} source={currentCity.image.homeImage}>
        <Animated.View
          style={{
            height: '100%',
            bottom: 0,
            position: 'absolute',
            width: '100%',
            opacity
          }}
        >
          <LinearGradient
            colors={['rgba(0,0,0,.2)', 'rgba(0,0,0,1)']}
            style={{ height: '100%', bottom: 0, position: 'absolute', width: '100%' }}
          ></LinearGradient>
        </Animated.View>
      </ImageBackground>
      <CityWeatherItem />
    </Animated.View>
  );
};
