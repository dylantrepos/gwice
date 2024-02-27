import { Platform, StyleSheet } from "react-native";
import palette from "../../assets/palette";

export default StyleSheet.create({
  buttonContainer: {
    backgroundColor: palette.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  iconColor: {
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
    semiBold: '600',
    bold: '700',
  },
  variant: {
    solid: 'solid',
    outline: 'outline',
    clear: 'clear',
  },
  type: {
    primary: {
      background: {
        light: palette.blueLight,
        dark: palette.blue,
      },
      text: {
        light: palette.white,
        dark: palette.white,
      },
    },
    disabled: {
      background: {
        light: palette.grayLight,
        dark: palette.grayLight,
      },
      text: {
        light: palette.white,
        dark: palette.white,
      },
    },
    transparent: {
      background: {
        light: 'transparent',
        dark: 'transparent',
      },
      text: {
        light: palette.black,
        dark: palette.white,
      },
    },
    transparentPrimary: {
      background: {
        light: 'transparent',
        dark: 'transparent',
      },
      text: {
        light: palette.blueLight,
        dark: palette.blueLight,
      },
    },
    confirm: {
      background: {
        light: palette.blueLight,
        dark: palette.blue,
      },
      text: {
        light: palette.white,
        dark: palette.white,
      },
    },
    alert: {
      background: {
        light: palette.red,
        dark: palette.red,
      },
      text: {
        light: palette.white,
        dark: palette.white,
      },
    },
  }
}
