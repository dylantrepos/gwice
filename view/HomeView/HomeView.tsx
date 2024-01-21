import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import style from './HomeView.style';
import { CityBackgroundItem } from "../../components/CityBackgroundItem/CityBackgroundItem";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeView = () => {
  return (
    <SafeAreaView style={style.container}>
      <CityBackgroundItem />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}
