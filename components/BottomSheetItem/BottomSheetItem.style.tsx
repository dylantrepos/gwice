import { Platform, StyleSheet } from "react-native";
import palette from "../../assets/palette";

export default StyleSheet.create({
  modalContentContainer: { 
    paddingHorizontal: 20, 
    paddingVertical: 10,
    paddingBottom: 30,
  },
  modalHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingHorizontal: 10,
    paddingBottom: 10,
  },
  confirmButton: {
    backgroundColor: palette.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  }
});

export const themeStyle = {
  containerBackground: {
    light: palette.white,
    dark: palette.black,
  },
  handleIndicator: {
    light: palette.black,
    dark: palette.white,
  },
}