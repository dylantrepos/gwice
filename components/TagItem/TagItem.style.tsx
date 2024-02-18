import { Platform, StyleSheet } from "react-native";
import palette from "../../assets/palette";

export default StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    right: 5,
    top: 5,
    borderRadius: 100,
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderWidth: 1,
  }
});

export const themeStyle = {
  background: {
    light: palette.grayLighter,
    dark: palette.blackLighter,
  },
  border: {
    light: palette.grayLight,
    dark: palette.grayLight,
  },
}