import { StatusBar } from "expo-status-bar"
import { View } from "react-native"
import style from './HomeScreenView.style';
import { CityBackgroundItem } from "../../components/CityBackgroundItem/CityBackgroundItem";

export const HomeScreenView = () => {
  return (
    <View style={style.container}>
      <CityBackgroundItem />
      <StatusBar style="auto" />
    </View>
  )
}
