import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  cityWeatherLargeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 25,
    paddingVertical: 10,
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
    height: 120,
    width: 120,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 5,
  },
  cityWeatherListSmall: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  cityWeatherSmallContainer: { 
    backgroundColor: 'white',
    width: 60,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 120,
  },
  cityWeatherSmallImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  cityWeatherSmallTextTitle: {
    fontSize: 14,
    fontWeight: '700',
  }
});