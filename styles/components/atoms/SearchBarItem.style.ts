import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 50,
    // paddingVertical: 10,
    // margin: 20,
    // marginBottom: 10,
    height: '100%',
    borderRadius: 100,
    gap: 10,
    // flex: 3
    width: '100%'
  },
  searchInput: {
    fontSize: 16,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 50,
    paddingVertical: 10
  },
  searchTitle: {
    fontSize: 16,
    color: '#A0A0A0',
    lineHeight: 22
  },
  searchIconReset: {
    position: 'absolute',
    right: 0,
    width: 50,
    height: 40,
    borderTopEndRadius: 100,
    borderBottomEndRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
