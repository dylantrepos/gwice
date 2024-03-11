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
    card: palette.whitePrimary,
    background: palette.whitePrimary,
    border: palette.gray200,
    notification: palette.red,
    primary: palette.bluePrimary,
    switchThumb: palette.grayLight,
    text: palette.blackPrimary,

    // Bottom Navigation
    bottomNavBackground: palette.whitePrimary,
    bottomNavIcon: palette.grayLight,
    bottomNavIconActive: palette.bluePrimary,
    bottomNavBorder: palette.grayLight,

    /**
     * Components
     */
    // Button
    buttonBackground: palette.gray100,

    // Tag
    tagBackground: palette.whitePrimary,
    tagBorder: palette.grayLight,

    // BottomSheet
    bottomSheetBackground: palette.whitePrimary,
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
    card: palette.blackPrimary,
    background: palette.blackPrimary,
    border: palette.black500,
    notification: palette.red,
    primary: palette.bluePrimary,
    switchThumb: palette.grayLight,
    text: palette.whitePrimary,

    // Bottom Navigation
    bottomNavBackground: palette.blackPrimary,
    bottomNavIcon: palette.grayLight,
    bottomNavIconActive: palette.bluePrimary,
    bottomNavBorder: palette.red,

    /**
     * Components
     */
    // Button
    buttonBackground: palette.black400,

    // Tag
    tagBackground: palette.blackPrimary,
    tagBorder: palette.grayLight,

    // BottomSheet
    bottomSheetBackground: palette.blackPrimary,
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
