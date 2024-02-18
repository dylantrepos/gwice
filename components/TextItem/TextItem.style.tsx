import { Platform, StyleSheet } from "react-native";
import palette from "../../assets/palette";
import { Weight } from "lucide-react-native";

export default StyleSheet.create({
  text: {

  }
});

export const themeStyle = {
  color: {
    light: palette.black,
    dark: palette.white,
  },
  size: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
  },
  weight: {
    light: '400',
    regular: '500',
    bold: '700',
  }
}