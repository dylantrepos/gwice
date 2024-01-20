import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import style from './HomeScreenView.style';
import { CityBackgroundItem } from "../../components/CityBackgroundItem/CityBackgroundItem";
import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreenView = () => {
  return (
    <SafeAreaView style={style.container}>
      <CityBackgroundItem />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}
