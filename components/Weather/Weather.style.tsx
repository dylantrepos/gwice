import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  cityWeather: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    justifyContent: 'center',
  },
  cityWeatherDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    justifyContent: 'center',
  },
  cityAnimated: {
    height: 150,
    width: 150,
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
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
  },
  cityWeatherInfo: {
    flex: 1,
    gap: 5,
    // backgroundColor: 'blue',
  },
  cityWeatherDate: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  cityWeatherInfoDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cityWeatherTempMin: {
    color: '#3988FD',
    marginLeft: 4,
  },
  cityWeatherTempMax: {
    color: '#FD3939',
  },
});