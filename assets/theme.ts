import { type Theme } from '../types/Theme';
import palette from './palette';

export const THEME: Theme = {
  // Appearance
  style: {
    viewBackground: {
      light: palette.white,
      dark: palette.blackLighter
    }
    // header: {
    //   leftButtonBackground: {
    //     light: palette.white,
    //     dark: palette.black
    //   },
    //   leftButtonIcon: {
    //     light: palette.black,
    //     dark: palette.white
    //   }
    // },
    // headerBackground: {
    //   light: palette.white,
    //   dark: palette.black
    // },

    // titleBackground: {
    //   light: palette.black,
    //   dark: palette.white
    // },
    // text: {
    //   light: palette.black,
    //   dark: palette.white
    // },
    // textScrolled: {
    //   light: palette.black,
    //   dark: palette.white
    // }
  },

  // Spacing
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40
  },

  // Icon
  iconSize: {
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48
  },

  iconStroke: {
    strong: 'strong',
    light: 'light'
  },

  // Size
  textSize: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32
  },

  // Standard
  standard: {
    headerHeight: 70
  }
};
