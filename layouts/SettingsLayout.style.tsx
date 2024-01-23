import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  cityWeatherCurrent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    justifyContent: 'center',
  },
  settingsLayout: {
    flex: 1,
    backgroundColor: '#fff',
  },
  settingsLayoutHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  settingsLayoutChevron: {
    width: 70,
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    height: 50,
    position: 'absolute',
    zIndex: 1,
  },
  settingsLayoutTitle: {
    paddingVertical: 20,
    fontSize: 26,
    fontWeight: '500',
    width: '100%',
    lineHeight: 32,
    color: '#0D89CE',
    textAlign: 'center',
  },  
});