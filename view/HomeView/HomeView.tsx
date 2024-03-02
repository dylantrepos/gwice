import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, RefreshControl, ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { THEME } from '../../assets/palette';
import { CityBackgroundItem } from '../../components/CityBackgroundItem/CityBackgroundItem';
import { CityEventsListHorizontalItem } from '../../modules/CityEvents/components/CityEventsListHorizontalItem/CityEventsListHorizontalItem';
import { setRefetchHome } from '../../reducers/generalReducer';
import { type RootState } from '../../store/store';
import style from './HomeView.style';

interface HomeViewProps {
  navigation: any;
  route: any;
}

export const HomeView = ({ navigation, route }: HomeViewProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme, currentCity, refetchHome, currentHomeViewDate } = useSelector(
    (state: RootState) => state.generalReducer
  );
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View>
      <ScrollView
        style={{
          ...style.scrollView,
          backgroundColor: THEME.background.light
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <CityBackgroundItem />
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
