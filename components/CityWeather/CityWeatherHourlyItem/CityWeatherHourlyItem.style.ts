import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  cityWeatherHourlyContainer: { 
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    // width: 84,
  },
  cityWeatherHourlyEmptyContainer: { 
    borderRadius: 10,
    overflow: 'hidden',
    // width: 84,
  },
  cityWeatherHourlyContainerAnimated: { 
    backgroundColor: 'white',
    alignItems: 'center',
    // minHeight: 120,
    columnGap: 10,
    position: 'relative',
    paddingVertical: 10,
  },
  halfBottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '60%',
    width: '100%',
    // backgroundColor: '#F6F6F6',
    borderRadius: 10,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    zIndex: -1,
  },
  cityWeatherHourlyImage: {
    width: '80%',
    height: 50,
    marginBottom: 5,
  },
  cityWeatherHourlyTemperature: {
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