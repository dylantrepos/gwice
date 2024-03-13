import { type appearance } from '../../../types/Theme';
import { type THEME } from '../../assets/theme';

export interface HeaderProps {
  headerTitle?: string;
  headerTitleColor?: string;
  headerLeftIcon?: any;
  headerTransparent?: boolean;
  headerRightIcon?: any;
  headerHandleLeftIconPress?: () => void;
  headerHandleRightIconPress?: () => void;
  headerIconSize?: keyof typeof THEME.iconSize;
  headerIconColor?: string | null;
  headerIconStroke?: keyof typeof THEME.iconStroke;
  headerBackground?: string;
  headerWithBackNavigation?: boolean;
}

export interface HeaderThemeProps {
  headerHeight: number;
  headerBackground: appearance;
  titleColor: appearance;
}
