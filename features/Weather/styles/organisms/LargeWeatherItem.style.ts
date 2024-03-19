import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cityWeather: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  cityWeatherDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    shadowColor: '#000',
    justifyContent: 'center'
  },
  cityAnimated: {
    // height: 150,
    // width: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
  },
  cityImageInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  image: {
    height: 100,
    width: 120
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
  },
  cityWeatherInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5
    // backgroundColor: 'blue',
  },
  cityWeatherInfoDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  cityWeatherTempMin: {
    color: '#3988FD'
  },
  cityWeatherTempMax: {
    color: '#FD3939'
  }
});
