import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 400,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  cityName: {
    zIndex: 1,
    fontSize: 90,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 19,
    fontFamily: "Poppins_400Regular",
    marginTop: 125,
  }
});