import { type appearance } from '../../Theme';

export interface HeaderProps {
  headerTitle?: string;
  headerTitleColor?: string;
  headerLeftIcon?: any;
  headerTransparent?: boolean;
  headerRightIcon?: any;
  headerHandleLeftIconPress?: () => void;
  headerHandleRightIconPress?: () => void;
  headerIconColor?: string | null;
  headerBackground?: string;
  headerWithBackNavigation?: boolean;
}

export interface HeaderThemeProps {
  headerHeight: number;
  headerBackground: appearance;
  titleColor: appearance;
}
