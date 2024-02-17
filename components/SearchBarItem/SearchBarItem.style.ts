import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    margin: 20,
    marginBottom: 10,
    borderRadius: 100,
    gap: 10,
    overflow: 'hidden',
    paddingRight: 50
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingTop: 0,
    paddingBottom: 0, 

  },
  searchTitle: {
    fontSize: 16,
    color: '#A0A0A0',
    lineHeight: 22,
  },
  searchIconReset: {
    backgroundColor: '#f5f5f5',
    position: 'absolute',
    right: 0,
    width: 50,
    height: 40,
    borderTopEndRadius: 100,
    borderBottomEndRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },  
});
