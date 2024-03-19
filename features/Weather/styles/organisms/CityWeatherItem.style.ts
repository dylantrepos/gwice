import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cityWeatherItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityWeatherLargeContainer: {
    width: '90%',
    // paddingHorizontal: 15,`
    // overflow: 'hidden',
    borderRadius: 10,
    minWidth: '90%',
    // minHeight: 150,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '25%'
  },
  cityWeatherListSmall: {
    flexGrow: 0
  }
});
