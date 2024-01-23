import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  cityWeatherHourlyContainer: { 
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
  cityWeatherHourlyImage: {
    width: 50,
    height: 50,
    // marginBottom: 5,
  },
  cityWeatherHourlyTextTitle: {
    fontSize: 14,
    fontWeight: '400',
  },
  cityWeatherHourlyTextDate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#878787',
  },
  cityWeatherHourlyTextHour: {
    fontSize: 14,
    fontWeight: '600',
    // color: '#878787',
  }
});