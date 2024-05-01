import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CityBackgroundItem } from '../components/molecules/CityBackgroundItem';
import { TitleItem } from '../components/molecules/TitleItem';
import { CityEventsListHorizontalItem } from '../features/CityEvents/components/organisms/CityEventsListHorizontalItem';
import { Layout } from '../layouts/Layout';
import { setRefetchHome } from '../reducers/generalReducer';
import { type RootState } from '../store/store';

export const HomePage = (): ReactNode => {
  const [refreshing, setRefreshing] = useState(false);
  const { currentCity } = useSelector((state: RootState) => state.generalReducer);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: currentCity.cityName ?? 'Home',
      headerShow: true
    });
  }, [currentCity]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleEventNavigation = (): void => {
    // @ts-expect-error navigate need definition
    navigation.navigate('CityEventsNew');
  };

  return (
    <Layout>
      <ScrollView
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ flex: 1 }}
      >
        <CityBackgroundItem />
        <TitleItem
          title={t('screens.home.text.event')}
          size="xl"
          handleNavigation={handleEventNavigation}
          rightIcon={ChevronRight}
        />
        <CityEventsListHorizontalItem />
      </ScrollView>
    </Layout>
  );
};
