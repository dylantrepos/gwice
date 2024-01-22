import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  cityWeatherItem: {
    maxWidth: '90%',

  },
  cityWeatherLargeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingRight: 25,
    paddingLeft: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    justifyContent: 'center',
    minWidth: 300,
    minHeight: 120,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 20,
        shadowColor: '#000',
      },
    }),
  },
  image: {
    height: 150,
    width: 150,
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  cityWeatherListSmall: {
    marginTop: 20,
    // backgroundColor: 'red',
    flexGrow: 0,
  },
  cityWeatherSmallContainer: { 
    backgroundColor: 'white',
    width: 85,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    // minHeight: 120,
    columnGap: 5,
    position: 'relative',
  },
  halfBottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '50%',
    width: '100%',
    // backgroundColor: '#F6F6F6',
    borderRadius: 10,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    zIndex: -1,
  },
  cityWeatherSmallImage: {
    width: 50,
    height: 50,
    // marginBottom: 5,
  },
  cityWeatherSmallTextTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  cityWeatherSmallTextDate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#878787',
  },
  cityWeatherSmallTextHour: {
    fontSize: 14,
    fontWeight: '700',
    // color: '#878787',
  }
});