import { StyleSheet } from 'react-native';
import palette from '../../../theme/palette';
import WeatherStyle from '../cityWeather.style';

export default StyleSheet.create({
  ...WeatherStyle,
  cityWeatherTemp: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  cityWeatherTempMin: {
    color: palette.blue500,
    marginLeft: 4
  },
  cityWeatherTempMax: {
    color: palette.red
  }
});
