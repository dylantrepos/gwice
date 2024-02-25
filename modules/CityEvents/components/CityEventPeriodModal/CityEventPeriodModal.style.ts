import { Platform, StyleSheet } from "react-native";
import palette from "../../../../assets/palette";

export default StyleSheet.create({
  item: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: palette.blue,
    borderWidth: 1,
  },
  itemText: {
    color: 'black',
  },
  selectedItemText: {
    color: 'red',
  },

});

export const themeStyle = {
  filterBackgroundColor: {
    light: palette.white,
    dark: palette.grayDark,
  },
  textDefault: {
    light: palette.black,
    dark: palette.white,
  }
}