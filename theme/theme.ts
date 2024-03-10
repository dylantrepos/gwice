import { type Theme } from '@react-navigation/native';
import palette from './palette';

interface ExtendedTheme extends Theme {
  // Reference the Theme type's colors field and make our field an intersection
  // Learn more:
  //   https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
  //   https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
  colors: Theme['colors'] & {
    switchThumb: string;
    bottomNavBackground: string;
    bottomNavIcon: string;
    bottomNavIconActive: string;
    bottomNavBorder: string;

    /**
     * Components
     */
    // Button
    buttonBackground: string;

    // Tag
    tagBackground: string;
    tagBorder: string;

    // BottomSheet
    bottomSheetBackground: string;
    bottomSheetHandleBackground: string;
    bottomSheetIndicatorBackground: string;

    // Calendar
    calendarBackground: string;
    calendarText: string;
  };
}

const DefaultTheme: ExtendedTheme = {
  dark: false,
  colors: {
    card: palette.whiteLight,
    background: palette.whiteLight,
    border: palette.grayLight,
    notification: palette.red,
    primary: palette.bluePrimary,
    switchThumb: palette.grayLight,
    text: palette.blackPrimary,

    // Bottom Navigation
    bottomNavBackground: palette.whiteLight,
    bottomNavIcon: palette.grayLight,
    bottomNavIconActive: palette.bluePrimary,
    bottomNavBorder: palette.grayLight,

    /**
     * Components
     */
    // Button
    buttonBackground: palette.grayLight,

    // Tag
    tagBackground: palette.whiteLight,
    tagBorder: palette.grayLight,

    // BottomSheet
    bottomSheetBackground: palette.whiteLight,
    bottomSheetHandleBackground: palette.grayLight,
    bottomSheetIndicatorBackground: palette.blackPrimary,

    // Calendar
    calendarBackground: palette.whitePrimary,
    calendarText: palette.blackPrimary
  }
};

const DarkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    card: palette.blackLight,
    background: palette.blackPrimary,
    border: palette.grayDark,
    notification: palette.red,
    primary: palette.bluePrimary,
    switchThumb: palette.grayLight,
    text: palette.whitePrimary,

    // Bottom Navigation
    bottomNavBackground: palette.whiteLight,
    bottomNavIcon: palette.grayLight,
    bottomNavIconActive: palette.bluePrimary,
    bottomNavBorder: palette.grayLight,

    /**
     * Components
     */
    // Button
    buttonBackground: palette.blackLight,

    // Tag
    tagBackground: palette.blackPrimary,
    tagBorder: palette.grayLight,

    // BottomSheet
    bottomSheetBackground: palette.blackLight,
    bottomSheetHandleBackground: palette.grayLight,
    bottomSheetIndicatorBackground: palette.whitePrimary,

    // Calendar
    calendarBackground: palette.blackPrimary,
    calendarText: palette.whitePrimary
  }
};

export { DarkTheme, DefaultTheme };
declare module '@react-navigation/native' {
  // eslint-disable-next-line
  export function useTheme(): ExtendedTheme;
}
