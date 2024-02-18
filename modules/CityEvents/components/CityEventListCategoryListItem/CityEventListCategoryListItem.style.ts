import { Platform, StyleSheet } from "react-native";
import palette from "../../../../assets/palette";

export default StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryTitleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryContainerTitle: {
    fontSize: 18,
    paddingTop: 10,
  },
  categoryList: {
  },
  category: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  categoryIcon: {
  },
  categoryName: {
    textAlign: 'center',
  },
});

export const themeStyle = {
  categoryBackgroundIncludeColor: {
    light: palette.white,
    dark: palette.white,
  },
  categoryBackgroundExcludeColor: {
    light: palette.black,
    dark: palette.white,
  },
  categoryTextColor: {
    light: palette.black,
    dark: palette.white,
  },
}