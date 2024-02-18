export const palette = {
  white: '#FFFFFF',
  black: '#000000',
  blackLighter: '#0E0E0E',
  grayLight: '#A0A0A0',
  grayLighter: '#F5F5F5',
  grayLightest: '#5C5C5C',
  grayAnother: '#F6F6F6',
  grayDark: '#2F2F2F',
  blueLight: '#3988FD',
  blue: '#0D89CE',
  red: '#FD3939',

};

export type Theme = 'light' | 'dark';

export type TestTheme = {
  background: {
    light: Theme;
    dark: Theme;
  },
  text: {
    light: Theme;
    dark: Theme;
  },
  spacing: {
    s: number;
    m: number;
    l: number;
    xl: number;
  },
  textSize: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  },
}

export const THEME = {
  background: {
    light: palette.white,
    dark: palette.blackLighter,
  },
  text: {
    light: palette.black,
    dark: palette.white,
  },
  view: {
    light: palette.white,
    dark: palette.black,
  },
  
  // Spacing
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },

  //Size
  textSize: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  /*
   * COMPONENTS 
   */

  // Bottom Navigation
  bottomNavigation: {
    background: {
      light: palette.white,
      dark: palette.black,
    },
    border: {
      light: palette.grayLight,
      dark: palette.grayDark,
    },
    icon: {
      color: {
        light: palette.grayLight,
        dark: palette.grayLight,
      },
      size: {
        sm: 18,
        md: 26,
        lg: 34,
        xl: 42,
      },
    },
  },

  // Tag
  tag: {
    background: {
      light: palette.grayLighter,
      dark: palette.blackLighter,
    },
    border: {
      light: palette.grayLight,
      dark: palette.grayLight,
    },
  },

  // Icon 
  icon: {
    color: {
      light: palette.black,
      dark: palette.white,
    },
    size: {
      sm: 18,
      md: 26,
      lg: 34,
      xl: 42,
    },
    stroke: {
      light: 1,
      strong: 2,
    }
  },

  // Hourly Weather
  cityWeatherHourlyItem: {
    halfBorderColor: {
      light: palette.grayAnother,
      dark: palette.grayDark,
    },
  },
}


export default palette;