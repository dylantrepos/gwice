import { StyleSheet } from 'react-native';
import palette from '../../../theme/palette';

export default StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row'
  },
  categoryTitleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  categoryContainerTitle: {
    fontSize: 18,
    paddingTop: 10
  },
  categoryList: {},
  category: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10
  },
  categoryIcon: {},
  categoryName: {
    textAlign: 'center'
  }
});

export const themeStyle = {
  categoryBackgroundIncludeColor: {
    light: palette.whitePrimary,
    dark: palette.whitePrimary
  },
  categoryBackgroundExcludeColor: {
    light: palette.blackPrimary,
    dark: palette.whitePrimary
  },
  categoryTextColor: {
    light: palette.blackPrimary,
    dark: palette.whitePrimary
  }
};
