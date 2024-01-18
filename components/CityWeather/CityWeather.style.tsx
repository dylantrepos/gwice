import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cityWeatherLargeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { 
      width: 1, 
      height: 1 
    },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  image: {
    height: 80,
    width: 80,
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
    marginTop: 20,
  },
  cityWeatherSmallContainer: { 
    backgroundColor: 'white',
    width: 60,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  cityWeatherSmallImage: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  cityWeatherSmallTextTitle: {
    fontSize: 14,
    fontWeight: '700',
  }
});