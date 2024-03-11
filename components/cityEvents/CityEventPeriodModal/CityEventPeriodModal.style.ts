import { StyleSheet } from 'react-native';
import palette from '../../../theme/palette';

export default StyleSheet.create({
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
    color: 'red'
  }
});
