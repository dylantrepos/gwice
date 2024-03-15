import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import { useCallback, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { CityBackgroundItem } from '../../components/base/CityBackgroundItem/CityBackgroundItem';
import { TitleItem } from '../../components/general/TitleItem/TitleItem';
import { CityEventsListHorizontalItem } from '../../features/CityEvents/components/CityEventsListHorizontalItem/CityEventsListHorizontalItem';
import { Layout } from '../../layouts/Layout';
import { setRefetchHome } from '../../reducers/generalReducer';

export const HomeView = (): ReactNode => {
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleEventNavigation = (): void => {
    // @ts-expect-error navigate need definition
    navigation.navigate('CityEvents');
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
