import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    flex: 1,
  },
  image: {
    // height: 400,
    height: '95%',
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  cityName: {
    zIndex: 1,
    fontSize: 90,
    color: '#fff',
    marginTop: 50,
    width: '100%',
    textAlign: 'center',
    
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 25,
      },
    }),
  },
  cityNameTest: {
    zIndex: 1,
    fontSize: 90,
    color: '#fff',
    marginTop: 50,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 25,
      },
    }),
  }
});