import { StyleSheet } from 'react-native';
import palette from '../../../theme/palette';

export default StyleSheet.create({
  cityWeather: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    justifyContent: 'center'
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
    // flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'flex-end'
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
  },
  cityWeatherInfo: {
    flex: 1,
    gap: 5
    // backgroundColor: 'blue',
  },
  cityWeatherInfoDetail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  cityWeatherTempMin: {
    color: palette.blue200
  },
  cityWeatherTempMax: {
    color: palette.red200
  }
});
