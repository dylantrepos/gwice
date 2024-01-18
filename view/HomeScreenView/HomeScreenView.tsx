import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"
import style from './HomeScreenView.style';
import CityBackground from "../../components/CityBackground/CityBackground";

export const HomeScreenView = () => {
  return (
    <View style={style.container}>
      <CityBackground />
      <StatusBar style="auto" />
    </View>
  )
}
