import { Platform, StyleSheet } from "react-native";
import WeatherStyle from "../Weather.style";

export default StyleSheet.create({
  ...WeatherStyle,
  cityWeatherTemp: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  cityWeatherTempMin: {
    color: '#3988FD',
    marginLeft: 4,
  },
  cityWeatherTempMax: {
    color: '#FD3939',
  },
});