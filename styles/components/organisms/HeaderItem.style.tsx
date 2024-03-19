import { StyleSheet } from 'react-native';
import palette from '../../../theme/palette';
import { type HeaderThemeProps } from '../../../types/components/organisms/HeaderItem.type';

export const HEADER_THEME: HeaderThemeProps = {
  headerHeight: 60,
  headerBackground: {
    light: palette.whitePrimary,
    dark: palette.blackPrimary
  },
  titleColor: {
    light: palette.blackPrimary,
    dark: palette.whitePrimary
  }
};

export default StyleSheet.create({
  headerStatusContainer: {
    top: 0,
    zIndex: 100,
    width: '100%'
  },
  statusBar: {
    width: '100%'
  },
  headerContainer: {
    height: HEADER_THEME.headerHeight,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  aside: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50
  },
  title: {
    fontSize: 20,
    flex: 3,
    verticalAlign: 'middle',
    textAlign: 'center',
    height: '100%'
  }
});
