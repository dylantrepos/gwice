import { StyleSheet } from 'react-native';
import palette from '../../../theme/palette';

export default StyleSheet.create({});

export const themeStyle = {
  color: {
    light: palette.blackPrimary,
    dark: palette.whitePrimary
  },
  size: {
    sm: 18,
    md: 26,
    lg: 34,
    xl: 42
  },
  stroke: {
    light: 1,
    strong: 2
  }
};
