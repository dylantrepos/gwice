import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { CityBackgroundItem } from '../../components/base/CityBackgroundItem/CityBackgroundItem';
import { CityEventsListHorizontalItem } from '../../components/cityEvents/CityEventsListHorizontalItem/CityEventsListHorizontalItem';
import { Layout } from '../../layouts/Layout';
import { setRefetchHome } from '../../reducers/generalReducer';

interface HomeViewProps {
  navigation: any;
  route: any;
}

export const HomeView = ({ navigation, route }: HomeViewProps): ReactNode => {
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const scrollPosition = useRef(new Animated.Value(0)).current;
  const [disabledButton, setDisabledButton] = useState(false);

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

  const handleNavigationTest = (screen: string): void => {
    setDisabledButton(true);
    navigation.push(screen);

    setTimeout(() => {
      setDisabledButton(false);
    }, 1000);
  };

  return (
    <Layout>
      <ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ flex: 1 }}
      >
        <CityBackgroundItem />
        <CityEventsListHorizontalItem
          title={t('screens.home.text.event')}
          handleNavigation={() => {
            if (!disabledButton) handleNavigationTest('HomeCulturalEvent');
          }}
        />
        <CityEventsListHorizontalItem
          title={t('screens.home.text.event')}
          handleNavigation={() => navigation.push('HomeCulturalEvent')}
        />
        <CityEventsListHorizontalItem
          title={t('screens.home.text.event')}
          handleNavigation={() => navigation.push('HomeCulturalEvent')}
        />
      </ScrollView>
    </Layout>
  );
};
