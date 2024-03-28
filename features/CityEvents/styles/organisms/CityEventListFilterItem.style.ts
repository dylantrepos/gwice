import { StyleSheet } from 'react-native';
import palette from '../../../../theme/palette';

export default StyleSheet.create({
  filterList: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  filter: {
    // color: '#fff',
    backgroundColor: '#ECECEC',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 100,
    gap: 10
  },
  filterIcon: {
    // color: '#fff',
  },
  filterTitle: {
    // color: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  item: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  selectedItem: {
    borderColor: palette.bluePrimary,
    borderWidth: 1
  },
  itemText: {
    color: 'black'
  },
  selectedItemText: {
    color: palette.bluePrimary
  }
});

export const themeStyle = {
  filterBackgroundColor: {
    light: palette.whitePrimary,
    dark: palette.gray800
  }
};
