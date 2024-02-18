import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 15,
    zIndex: 1,
  },
  headerChevron: {
    width: 70,
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    height: 50,
  },
  headerTitle: {
    height: 50,
    flex: 1,
    lineHeight: 24,
    verticalAlign: 'middle',
    textAlign: 'center',
  },  
  iconRight: {
    width: 70,
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    height: 50,
  }
});