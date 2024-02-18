import { StyleSheet } from "react-native";

export default StyleSheet.create({
  settingsScreen: {

  },
  settingsScreenButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  settingsScreenButtonTextIcon: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  settingsScreenButtonIcon: {
  },
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
  },
});