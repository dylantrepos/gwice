import { StatusBar } from "expo-status-bar"
import { RefreshControl, ScrollView, View } from "react-native"
import style from './HomeView.style';
import { CityBackgroundItem } from "../../components/CityBackgroundItem/CityBackgroundItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useDispatch } from 'react-redux';
import { setRefetchHome } from "../../reducers/generalReducer";

export const HomeView = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(setRefetchHome(true));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="auto" />
        <ScrollView 
          style={style.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        > 
          <CityBackgroundItem />
        </ScrollView>      
    </SafeAreaView>
  )
}
