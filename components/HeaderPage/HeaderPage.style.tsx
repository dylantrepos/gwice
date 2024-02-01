import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  headerChevron: {
    width: 70,
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',
    height: 50,
    position: 'absolute',
    zIndex: 1,
  },
  headerTitle: {
    paddingVertical: 20,
    fontSize: 22,
    fontWeight: '500',
    width: '100%',
    lineHeight: 32,
    color: '#0D89CE',
    textAlign: 'center',
  },  
});