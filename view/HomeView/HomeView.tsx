import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, View } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../../assets/theme';
import { CityBackgroundItem } from '../../components/CityBackgroundItem/CityBackgroundItem';
import { HeaderItem } from '../../components/HeaderItem/HeaderItem';
import { CityEventsListHorizontalItem } from '../../modules/CityEvents/components/CityEventsListHorizontalItem/CityEventsListHorizontalItem';
import { setRefetchHome } from '../../reducers/generalReducer';
import { type RootState } from '../../store/store';

interface HomeViewProps {
  navigation: any;
  route: any;
}

export const HomeView = ({ navigation, route }: HomeViewProps): ReactNode => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const scrollPosition = useRef(new Animated.Value(0)).current;

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
      <HeaderItem
        title={t('screens.home.title')}
        scrollPosition={scrollPosition}
        animTitle={true}
        withBackNavigation={false}
        transparent={true}
      />
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ flex: 1, backgroundColor: THEME.style.viewBackground[theme] }}
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
