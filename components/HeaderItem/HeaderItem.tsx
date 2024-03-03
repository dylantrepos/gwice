import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import { type PropsWithChildren, type ReactNode } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import palette from '../../assets/palette';
import { type RootState } from '../../store/store';
import { type ThemeColor } from '../../types/Theme';
import { IconItem } from '../IconItem/IconItem';
import { TextItem } from '../TextItem/TextItem';
import style, { HEADER_THEME } from './HeaderItem.style';
import { type HeaderProps } from './HeaderItem.type';

export const HeaderItem = ({
  headerTitle = '',
  headerTitleColor = palette.black,
  headerLeftIcon = null,
  headerRightIcon = null,
  headerHandleLeftIconPress = () => {},
  headerHandleRightIconPress = () => {},
  headerIconSize = 'md',
  headerIconColor = null,
  headerIconStroke = 'strong',
  headerBackground,
  headerWithBackNavigation = false
}: PropsWithChildren<HeaderProps>): ReactNode => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const statusBarColor = HEADER_THEME.headerBackground[
    theme === 'light' ? 'dark' : 'light'
  ] as ThemeColor;

  return (
    <View
      style={{
        height: insets.top + HEADER_THEME.headerHeight
      }}
    >
      <StatusBar style={statusBarColor} animated={true} />
      <View
        style={{
          height: insets.top,
          flex: 1,
          width: '100%',
          backgroundColor: HEADER_THEME.headerBackground[theme]
        }}
      />
      <Animated.View
        style={{
          top: insets.top,
          height: HEADER_THEME.headerHeight,
          width: '100%',
          backgroundColor: HEADER_THEME.headerBackground[theme],
          position: 'absolute',
          flexDirection: 'row'
        }}
      >
        <View
          style={{
            flex: 1
          }}
        >
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
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TextItem weight="regular" size="xxl" color={headerTitleColor}>
            {headerTitle}
          </TextItem>
        </View>
        <View
          style={{
            flex: 1
          }}
        >
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
