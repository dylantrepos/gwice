import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Search } from 'lucide-react-native';
import { useRef, useState, type ReactNode } from 'react';
import { Animated, Pressable, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { IconItem } from '../atoms/IconItem';
// import { type HeaderProps } from './HeaderItem.type';
import style from '../../styles/components/organisms/HeaderItem.style';
import { SearchBarItem } from '../atoms/SearchBarItem';

interface HeaderProps {
  title?: string | null;
  scrollPosition?: Animated.Value | null;
  animTitle?: boolean;
  inputRange?: number[];
  withBackNavigation?: boolean;
  hideBackNavigationOnTop?: boolean;
  withSearch?: boolean;
  transparent?: boolean;
  forceStatusBarShow?: boolean;
  forceTransparentBackground?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  searchHandleSubmitSearchValue?: (searchValue: string) => void;
  searchHandleIsFocused?: (isFocused: boolean) => void;
}

export const HeaderItem = ({
  title = null,
  scrollPosition = null,
  animTitle = false,
  inputRange = [0, 10],
  withBackNavigation = true,
  hideBackNavigationOnTop = true,
  transparent = false,
  forceStatusBarShow = false,
  forceTransparentBackground = false,
  withSearch = false,
  searchPlaceholder = '',
  searchValue = '',
  searchHandleSubmitSearchValue = () => {},
  searchHandleIsFocused = () => {}
}: HeaderProps): ReactNode => {
  const { top } = useSafeAreaInsets();
  const { isDarkMode } = useSelector((state: RootState) => state.generalReducer);
  const [showSearch, setShowSearch] = useState(false);
  const navigation = useNavigation();
  if (!scrollPosition) scrollPosition = useRef(new Animated.Value(0)).current;

  const headerBackgroundColor = scrollPosition.interpolate({
    inputRange,
    outputRange: !isDarkMode
      ? ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
      : ['rgba(0,0,0,0)', 'rgba(0,0,0,1)']
  });

  const textOpacity = scrollPosition.interpolate({
    inputRange,
    outputRange: [0, 1]
  });

  const textPosition = scrollPosition.interpolate({
    inputRange,
    outputRange: [10, 0],
    extrapolate: 'clamp'
  });

  return (
    <View
      style={{
        zIndex: 100
      }}
    >
      {forceStatusBarShow && (
        <Animated.View
          style={{
            ...style.statusBar,
            height: top
          }}
        >
          <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
        </Animated.View>
      )}
      <Animated.View
        style={{
          ...style.headerStatusContainer,
          position: transparent ? 'absolute' : 'relative',
          backgroundColor: forceTransparentBackground
            ? 'transparent'
            : transparent
              ? headerBackgroundColor
              : THEME.style.viewBackground[theme]
        }}
      >
        <Animated.View
          style={{
            ...style.statusBar,
            height: top
          }}
        >
          <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
        </Animated.View>
        <Animated.View style={style.headerContainer}>
          <View style={style.aside}>
            {withBackNavigation && navigation.canGoBack() && (
              <Pressable
                style={{
                  ...style.backButton
                  // backgroundColor: theme === 'light' ? 'white' : 'black'
                  // opacity: hideBackNavigationOnTop ? textOpacity : 1
                }}
                onPress={() => {
                  if (showSearch) setShowSearch(false);
                  else {
                    navigation.goBack();
                  }
                }}
              >
                <IconItem
                  IconElt={ArrowLeft}
                  size="md"
                  color={theme === 'light' ? 'black' : 'white'}
                  stroke="strong"
                />
              </Pressable>
            )}
          </View>
          {showSearch ? (
            <SearchBarItem
              styles={{
                flex: 4,
                marginRight: 10
              }}
              placeholder={searchPlaceholder}
              searchValue={searchValue}
              handleSubmitSearchValue={searchHandleSubmitSearchValue}
              handleIsFocused={searchHandleIsFocused}
            />
          ) : (
            <Animated.Text
              style={{
                ...style.title,
                opacity: animTitle ? textOpacity : 1,
                transform: animTitle ? [{ translateY: textPosition }] : [],
                color: theme === 'light' ? 'black' : 'white'
              }}
            >
              {title}
            </Animated.Text>
          )}
          <View
            style={{
              ...style.aside,
              flex: showSearch ? 0 : 1
            }}
          >
            {withSearch && !showSearch && (
              <Pressable
                style={style.backButton}
                onPress={() => {
                  setShowSearch(!showSearch);
                }}
              >
                <IconItem
                  IconElt={Search}
                  size="md"
                  color={theme === 'light' ? 'black' : 'white'}
                  stroke="strong"
                />
              </Pressable>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};
