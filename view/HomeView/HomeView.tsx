import { RefreshControl, ScrollView } from "react-native"
import style from './HomeView.style';
import { CityBackgroundItem } from "../../components/CityBackgroundItem/CityBackgroundItem";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchHome } from "../../reducers/generalReducer";
import { RootState } from "../../store/store";
import { CityEventsListHorizontalItem } from "../../modules/CityEvents/components/CityEventsListHorizontalItem/CityEventsListHorizontalItem";
import { THEME } from "../../assets/palette";
import { PageHeaderLayout } from "../../layouts/PageHeaderLayout";
import { useTranslation } from "react-i18next";

type HomeViewProps = {
  navigation: any;
  route: any;
};

export const HomeView = ({
  navigation,
  route
}: HomeViewProps)  => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme, currentCity, refetchHome, currentHomeViewDate } = useSelector((state: RootState) => state.generalReducer);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log('currentHomeViewDate :', currentHomeViewDate);
  }, [currentHomeViewDate]);

  return (
    <PageHeaderLayout 
      headerTitle={t("screens.home.title")}
      headerWithBackNavigation={false}
      headerWithTransparentBackground={true}
      headerTitleColor="white"
    >
       <ScrollView 
          style={{
            ...style.scrollView,
            backgroundColor: THEME.background[theme] as string,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        > 
          <CityBackgroundItem />
          <CityEventsListHorizontalItem
            navigation={navigation} 
            route={route} 
            title={t("screens.home.text.event")}
            handleNavigation={() => navigation.push('HomeCulturalEvent')}
          />
        </ScrollView>    
    </PageHeaderLayout>

  )
}
