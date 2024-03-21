import { StyleSheet } from 'react-native';
import palette from '../../../theme/palette';

export default StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export const themeStyle = {
  size: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20
  },
  weight: {
    light: '400',
    regular: '500',
    semiBold: '600',
    bold: '700'
  },
  variant: {
    solid: 'solid',
    outline: 'outline',
    clear: 'clear'
  },

  // Light theme
  buttonStyle: {
    primary: {
      backgroundColor: palette.bluePrimary,
      textColor: palette.whitePrimary
    },
    disabled: {
      backgroundColor: palette.gray200,
      textColor: palette.gray400
    },
    transparentPrimary: {
      backgroundColor: 'transparent',
      textColor: palette.bluePrimary
    }
  },

  // Dark theme
  buttonDarkStyle: {
    primary: {
      backgroundColor: palette.bluePrimary,
      textColor: palette.whitePrimary
    },
    disabled: {
      backgroundColor: palette.black300,
      textColor: palette.gray400
    },
    transparentPrimary: {
      backgroundColor: 'transparent',
      textColor: palette.bluePrimary
    }
  }
};
