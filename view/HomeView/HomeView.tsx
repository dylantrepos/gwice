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
      headerTitle="Accueil"
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
            title={'Événements culturels'}
            handleNavigation={() => navigation.push('HomeCulturalEvent')}
          />
        </ScrollView>    
    </PageHeaderLayout>
    // <SafeAreaView 
    //   style={{
    //     ...style.container,
    //   }}
    // >
    //   <StatusBar style="auto" />
    //   <View>
    //     {/* <HeaderItem
    //       withSearch={true}
    //       withBackgroundTransparent={true}
    //       iconColor="white"
    //       stickToTop={true}
    //     /> */}
    //     <HeaderItem
    //       title="Accueil"
    //       leftIcon={Search}
    //       rightIcon={Search}
    //       withBackNavigation={true}
    //       // isAbsolute={true}
    //       // withTransparentBackground={true}
    //     />
    //     <ScrollView 
    //       style={{
    //         ...style.scrollView,
    //         backgroundColor: THEME.background[theme] as string,
    //       }}
    //       refreshControl={
    //         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //       }
    //     > 
    //       <CityBackgroundItem />
    //       <CityEventsListHorizontalItem
    //         navigation={navigation} 
    //         route={route} 
    //         title={'Événements culturels'}
    //         handleNavigation={() => navigation.push('HomeCulturalEvent')}
    //       />
    //     </ScrollView>      
    //   </View>
    // </SafeAreaView>
  )
}
