export interface appearance {
  light: string;
  dark: string;
}

export type ThemeColor = 'light' | 'dark';

export interface Theme {
  style: {
    viewBackground: appearance;
  };
  spacing: {
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  iconSize: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  iconStroke: {
    strong: string;
    light: string;
  };
  textSize: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  standard: {
    headerHeight: number;
  };
}
