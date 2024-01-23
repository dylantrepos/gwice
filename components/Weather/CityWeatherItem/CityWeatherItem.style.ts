import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  cityWeatherItem: {
    maxWidth: '90%',
  },
  cityWeatherLargeContainer: {
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
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
  cityWeatherListSmall: {
    marginTop: 20,
    // backgroundColor: 'red',
    flexGrow: 0,
  },
});