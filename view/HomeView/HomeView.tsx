import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StatusBar, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { CityBackgroundItem } from '../../components/CityBackgroundItem/CityBackgroundItem';
import { CityEventsListHorizontalItem } from '../../modules/CityEvents/components/CityEventsListHorizontalItem/CityEventsListHorizontalItem';
import { setRefetchHome } from '../../reducers/generalReducer';
import { type RootState } from '../../store/store';

interface HomeViewProps {
  navigation: any;
  route: any;
}

export const HomeView = ({ navigation, route }: HomeViewProps): ReactNode => {
  const [refreshing, setRefreshing] = useState(false);
  // const { theme, currentCity, refetchHome, currentHomeViewDate } = useSelector(
  // (state: RootState) => state.generalReducer
  // );
  const { t } = useTranslation();
  const { bottom, top } = useSafeAreaInsets();
  const { theme } = useSelector((state: RootState) => state.generalReducer);

  const dispatch = useDispatch();
  const scrollPosition = useRef(new Animated.Value(0)).current;

  const headerBackgroundColor = scrollPosition.interpolate({
    inputRange: [0, 70],
    outputRange:
      theme === 'light'
        ? ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
        : ['rgba(0,0,0,0)', 'rgba(0,0,0,1)']
  });

  const textOpacity = scrollPosition.interpolate({
    inputRange: [0, 70],
    outputRange: [0, 1]
  });

  const textPosition = scrollPosition.interpolate({
    inputRange: [0, 70],
    outputRange: [10, 0],
    extrapolate: 'clamp'
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollPosition } } }],
    { useNativeDriver: false } // Set this to true if you're not using the scroll position in JS
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          backgroundColor: headerBackgroundColor,
          zIndex: 10,
          height: top,
          width: '100%',
          position: 'absolute',
          top: 0
        }}
      >
        <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      </Animated.View>
      <Animated.View
        style={{
          height: 70,
          flex: 1,
          zIndex: 1,
          backgroundColor: headerBackgroundColor, // Use the animated background color
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          top
        }}
      >
        <Animated.Text
          style={{
            opacity: textOpacity, // Use the animated text opacity
            transform: [{ translateY: textPosition }], // Use the animated text position
            color: theme === 'light' ? 'black' : 'white'
          }}
        >
          {' '}
          {t('screens.home.title')}{' '}
        </Animated.Text>
      </Animated.View>
      <ScrollView
        onScroll={onScroll} // Use the animated onScroll handler
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ flex: 1, backgroundColor: 'white' }}
      >
        <CityBackgroundItem />
        <CityEventsListHorizontalItem
          navigation={navigation}
          route={route}
          title={t('screens.home.text.event')}
          handleNavigation={() => navigation.push('HomeCulturalEvent')}
        />
        <CityEventsListHorizontalItem
          navigation={navigation}
          route={route}
          title={t('screens.home.text.event')}
          handleNavigation={() => navigation.push('HomeCulturalEvent')}
        />
        <CityEventsListHorizontalItem
          navigation={navigation}
          route={route}
          title={t('screens.home.text.event')}
          handleNavigation={() => navigation.push('HomeCulturalEvent')}
        />
      </ScrollView>
    </View>
  );
};
