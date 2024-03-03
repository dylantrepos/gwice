import { StyleSheet } from 'react-native';
import palette from '../../assets/palette';
import { type HeaderThemeProps } from './HeaderItem.type';

export default StyleSheet.create({
  headerIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const HEADER_THEME: HeaderThemeProps = {
  headerHeight: 70,
  headerBackground: {
    light: palette.white,
    dark: palette.blackLighter
  },
  titleColor: {
    light: palette.black,
    dark: palette.white
  }
};
