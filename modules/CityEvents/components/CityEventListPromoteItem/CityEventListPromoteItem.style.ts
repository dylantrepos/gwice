import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
  },
  headerTitle: {
    color: '#fff',
  },
  promoteEvent: {
    backgroundColor: '#0D89CE',
    position: 'relative',
  },
  promoteEventImage: {
    width: '100%',
    height: 400,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  promoteEventInfos: {
    gap: 10,
    width: '100%',
    height: 200,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  promoteEventDate: {
    color: '#fff',
    textAlign: 'center',
  },
  promoteEventButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    alignSelf: 'center',
  },
  promoteEventButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});