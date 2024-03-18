import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  cityWeatherItem: {
    width: '90%'
  },
  cityWeatherLargeContainer: {
    // paddingHorizontal: 15,
    overflow: 'hidden',
    borderRadius: 10,
    minWidth: 300,
    minHeight: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 0,
          height: 9
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35
      },
      android: {
        elevation: 20
      }
    })
  },
  cityWeatherListSmall: {
    marginTop: 20,
    // backgroundColor: 'red',
    flexGrow: 0
  }
});
