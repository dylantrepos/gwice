import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { type PropsWithChildren, type ReactNode } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { IconItem } from '../IconItem/IconItem';
import { TextItem } from '../TextItem/TextItem';
import style, { HEADER_THEME } from './HeaderItem.style';
import { type HeaderProps } from './HeaderItem.type';

export const HeaderItem = ({
  headerTitle = '',
  headerTitleColor,
  headerLeftIcon = null,
  headerRightIcon = null,
  headerHandleLeftIconPress = () => {},
  headerHandleRightIconPress = () => {},
  headerIconSize = 'md',
  headerIconColor = null,
  headerIconStroke = 'strong',
  headerBackground,
  headerTransparent = false,
  headerWithBackNavigation = false
}: PropsWithChildren<HeaderProps>): ReactNode => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const headerHeight = { height: HEADER_THEME.headerHeight + insets.top };
  const headerTopPosition = { top: insets.top };

  return (
    <View
      style={{
        ...headerHeight,
        position: headerTransparent ? 'absolute' : 'relative',
        backgroundColor: headerTransparent
          ? 'transparent'
          : headerBackground ?? HEADER_THEME.headerBackground[theme],
        width: '100%',
        zIndex: 100
      }}
    >
      <Animated.View style={[style.headerContainer, headerTopPosition]}>
        <View style={style.headerAsideContainer}>
          {headerWithBackNavigation && navigate.canGoBack() && (
            <Pressable
              onPress={() => {
                navigate.goBack();
              }}
              style={style.headerIcon}
            >
              <IconItem
                IconElt={ChevronLeft}
                size={headerIconSize}
                color={headerIconColor}
                stroke={headerIconStroke}
              />
            </Pressable>
          )}
          {headerLeftIcon && (
            <Pressable onPress={headerHandleLeftIconPress} style={style.headerIcon}>
              <IconItem
                IconElt={headerLeftIcon}
                size={headerIconSize}
                color={headerIconColor}
                stroke={headerIconStroke}
              />
            </Pressable>
          )}
        </View>
        <View style={style.headerMiddleContainer}>
          <TextItem weight="regular" size="xxl" color={headerTitleColor}>
            {headerTitle}
          </TextItem>
        </View>
        <View style={style.headerAsideContainer}>
          {headerRightIcon && (
            <Pressable onPress={headerHandleRightIconPress} style={style.headerIcon}>
              <IconItem
                IconElt={headerRightIcon}
                size={headerIconSize}
                color={headerIconColor}
                stroke={headerIconStroke}
              />
            </Pressable>
          )}
        </View>
      </Animated.View>
    </View>
  );
};
