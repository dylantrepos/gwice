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
  image: {
    height: 150,
    width: 150,
    flex: 1,  
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
  },
  cityWeatherInfo: {
    flex: 1,
    gap: 5,
  },
  cityWeatherDate: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  cityWeatherInfoDetail: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
});