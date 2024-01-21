import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
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
    transform: [
      { rotate: '180deg' }
    ],
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