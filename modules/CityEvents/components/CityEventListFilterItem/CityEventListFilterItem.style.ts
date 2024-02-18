import { Platform, StyleSheet } from "react-native";
import palette from "../../../../assets/palette";

export default StyleSheet.create({
  filterList: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  filter: {
    // color: '#fff',
    backgroundColor: '#ECECEC',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    gap: 10,
  },
  filterIcon: {
    // color: '#fff',
  },
  filterTitle: {
    // color: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
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
    color: palette.blue,
  },
});

export const themeStyle = {
  filterBackgroundColor: {
    light: palette.white,
    dark: palette.grayDark,
  },
}