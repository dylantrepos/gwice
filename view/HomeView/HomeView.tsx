import { StatusBar } from "expo-status-bar"
import { Pressable, RefreshControl, ScrollView, View } from "react-native"
import style from './HomeView.style';
import { CityBackgroundItem } from "../../components/CityBackgroundItem/CityBackgroundItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRefetchHome, setTheme } from "../../reducers/generalReducer";
import { RootState } from "../../store/store";
import { CityEventsListHorizontalItem } from "../../modules/CityEvents/components/CityEventsListHorizontalItem/CityEventsListHorizontalItem";
import { HeaderItem } from "../../components/HeaderItem/HeaderItem";
import { THEME } from "../../assets/palette";
import { TextItem } from "../../components/TextItem/TextItem";
import { HeaderItem2 } from "../../components/HeaderItem/HeaderItem2";
import { Search } from "lucide-react-native";
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
    //     <HeaderItem2
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
