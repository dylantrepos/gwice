import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  image: {
    height: 400,
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  cityName: {
    zIndex: 1,
    fontSize: 90,
    color: '#fff',
    marginTop: 50,
    
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        textShadowColor: '#000',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 15,
      },
    }),
  }
});