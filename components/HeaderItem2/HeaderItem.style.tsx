import { StyleSheet } from 'react-native';
import palette from '../../assets/palette';
import { type HeaderThemeProps } from './HeaderItem.type';

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

export default StyleSheet.create({
  headerContainer: {
    width: '100%',
    position: 'absolute',
    height: HEADER_THEME.headerHeight,
    flexDirection: 'row'
  },
  headerAsideContainer: {
    flex: 1
  },
  headerMiddleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
