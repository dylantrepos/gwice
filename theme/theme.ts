import { type Theme } from '@react-navigation/native';
import palette from './palette';

interface ExtendedTheme extends Theme {
  colors: Theme['colors'] & {
    backgroundTransparent: string;

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
    tagBackgroundActive: string;
    tagBorder: string;
    tagTextColor: string;
    tagTextActiveColor: string;

    // Divider
    dividerColor: string;

    // BottomSheet
    bottomSheetBackground: string;
    bottomSheetHandleBackground: string;
    bottomSheetIndicatorBackground: string;

    // Calendar
    calendarBackground: string;
    calendarText: string;

    // SearchBar
    searchBarBackground: string;
    searchBarIcon: string;
    searchBarText: string;

    /**
     * City event
     */
    // City event category list icons
    cityEventCategoryListBackgroundColor: string;
    cityEventCategoryListBackgroundSelectedColor: string;
    cityEventCategoryListIconColor: string;
    cityEventCategoryListIconSelectedColor: string;
    cityEventCategoryListTextColor: string;
    cityEventSearchBarBackground: string;
    cityEventSearchBarText: string;
  };
}

const DefaultTheme: ExtendedTheme = {
  dark: false,
  colors: {
    backgroundTransparent: 'transparent',
    card: palette.whitePrimary,
    background: palette.whitePrimary,
    border: palette.gray200,
    notification: palette.redPrimary,
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
    tagBackgroundActive: palette.bluePrimary,
    tagTextColor: palette.blackPrimary,
    tagTextActiveColor: palette.whitePrimary,

    // Divider
    dividerColor: palette.white400,

    // BottomSheet
    bottomSheetBackground: palette.whitePrimary,
    bottomSheetHandleBackground: palette.grayLight,
    bottomSheetIndicatorBackground: palette.blackPrimary,

    // Calendar
    calendarBackground: palette.whitePrimary,
    calendarText: palette.blackPrimary,

    // SearchBar
    searchBarBackground: palette.gray200,
    searchBarIcon: palette.gray500,
    searchBarText: palette.blackPrimary,

    /**
     * City event
     */
    // City event category list icons
    cityEventCategoryListBackgroundColor: 'transparent',
    cityEventCategoryListBackgroundSelectedColor: palette.bluePrimary,
    cityEventCategoryListIconColor: palette.blackPrimary,
    cityEventCategoryListIconSelectedColor: palette.whitePrimary,
    cityEventCategoryListTextColor: palette.blackPrimary,
    cityEventSearchBarBackground: palette.blue200,
    cityEventSearchBarText: palette.blackPrimary
  }
};

const DarkTheme: ExtendedTheme = {
  dark: true,
  colors: {
    backgroundTransparent: 'transparent',
    card: palette.blackPrimary,
    background: palette.blackPrimary,
    border: palette.black500,
    notification: palette.redPrimary,
    primary: palette.bluePrimary,
    switchThumb: palette.grayLight,
    text: palette.whitePrimary,

    // Bottom Navigation
    bottomNavBackground: palette.blackPrimary,
    bottomNavIcon: palette.grayLight,
    bottomNavIconActive: palette.bluePrimary,
    bottomNavBorder: palette.redPrimary,

    /**
     * Components
     */
    // Button
    buttonBackground: palette.black400,

    // Tag
    tagBackground: palette.blackPrimary,
    tagBorder: palette.grayLight,
    tagBackgroundActive: palette.bluePrimary,
    tagTextColor: palette.whitePrimary,
    tagTextActiveColor: palette.whitePrimary,

    // Divider
    dividerColor: palette.black300,

    // BottomSheet
    bottomSheetBackground: palette.blackPrimary,
    bottomSheetHandleBackground: palette.grayLight,
    bottomSheetIndicatorBackground: palette.whitePrimary,

    // Calendar
    calendarBackground: palette.blackPrimary,
    calendarText: palette.whitePrimary,

    // SearchBar
    searchBarBackground: palette.black400,
    searchBarIcon: palette.grayLight,
    searchBarText: palette.whitePrimary,

    /**
     * City event
     */
    // City event category list icons
    cityEventCategoryListBackgroundColor: 'transparent',
    cityEventCategoryListBackgroundSelectedColor: palette.bluePrimary,
    cityEventCategoryListIconColor: palette.whitePrimary,
    cityEventCategoryListIconSelectedColor: palette.whitePrimary,
    cityEventCategoryListTextColor: palette.whitePrimary,
    cityEventSearchBarBackground: palette.blue200,
    cityEventSearchBarText: palette.blackPrimary
  }
};

export { DarkTheme, DefaultTheme };
declare module '@react-navigation/native' {
  // eslint-disable-next-line
  export function useTheme(): ExtendedTheme;
}
