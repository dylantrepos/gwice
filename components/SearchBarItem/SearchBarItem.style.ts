import { StyleSheet } from 'react-native';
import palette from '../../theme/palette';

export default StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 10,
    // margin: 20,
    // marginBottom: 10,
    borderRadius: 100,
    gap: 10,
    overflow: 'hidden',
    flex: 3
  },
  searchInput: {
    fontSize: 16,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 50
  },
  searchTitle: {
    fontSize: 16,
    color: '#A0A0A0',
    lineHeight: 22
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
    alignItems: 'center'
  }
});

export const themeStyle = {
  background: {
    light: palette.gray200,
    dark: palette.gray800
  }
};
