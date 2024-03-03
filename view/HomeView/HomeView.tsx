import { useCallback, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { CityBackgroundItem } from '../../components/CityBackgroundItem/CityBackgroundItem';
import { Layout } from '../../layouts/Layout';
import { CityEventsListHorizontalItem } from '../../modules/CityEvents/components/CityEventsListHorizontalItem/CityEventsListHorizontalItem';
import { setRefetchHome } from '../../reducers/generalReducer';

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

  const dispatch = useDispatch();
  // const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <Layout
      header={{
        headerTitle: t('screens.home.title'),
        headerTransparent: true
      }}
    >
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <CityBackgroundItem />
        <CityEventsListHorizontalItem
          navigation={navigation}
          route={route}
          title={t('screens.home.text.event')}
          handleNavigation={() => navigation.push('HomeCulturalEvent')}
        />
      </ScrollView>
    </Layout>
  );
};
