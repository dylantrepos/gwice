import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  cityWeather: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    justifyContent: 'center',
  },
  cityWeatherDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    justifyContent: 'center',
  },
  cityAnimated: {
    height: 150,
    // width: 150,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
  },
  image: {
    height: 150,
    width: 150,
    alignSelf: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
  },
  cityWeatherInfo: {
    flex: 1,
    gap: 5,
    // backgroundColor: 'blue',
  },
  cityWeatherInfoDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cityWeatherTempMin: {
    color: '#3988FD',
  },
  cityWeatherTempMax: {
    color: '#FD3939',
  },
});