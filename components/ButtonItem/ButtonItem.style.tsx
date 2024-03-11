import { StyleSheet } from 'react-native';
import palette from '../../theme/palette';

export default StyleSheet.create({
  buttonContainer: {
    backgroundColor: palette.bluePrimary,
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
  background: {
    light: palette.gray200,
    dark: palette.black200
  },
  border: {
    light: palette.grayLight,
    dark: palette.grayLight
  },
  iconColor: {
    light: palette.blackPrimary,
    dark: palette.whitePrimary
  },
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
  type: {
    primary: {
      background: {
        light: palette.bluePrimary,
        dark: palette.bluePrimary
      },
      text: {
        light: palette.whitePrimary,
        dark: palette.whitePrimary
      }
    },
    disabled: {
      background: {
        light: palette.grayLight,
        dark: palette.grayLight
      },
      text: {
        light: palette.whitePrimary,
        dark: palette.whitePrimary
      }
    },
    transparent: {
      background: {
        light: 'transparent',
        dark: 'transparent'
      },
      text: {
        light: palette.blackPrimary,
        dark: palette.whitePrimary
      }
    },
    transparentPrimary: {
      background: {
        light: 'transparent',
        dark: 'transparent'
      },
      text: {
        light: palette.bluePrimary,
        dark: palette.bluePrimary
      }
    },
    confirm: {
      background: {
        light: palette.bluePrimary,
        dark: palette.bluePrimary
      },
      text: {
        light: palette.whitePrimary,
        dark: palette.whitePrimary
      }
    },
    alert: {
      background: {
        light: palette.red,
        dark: palette.red
      },
      text: {
        light: palette.whitePrimary,
        dark: palette.whitePrimary
      }
    }
  }
};
