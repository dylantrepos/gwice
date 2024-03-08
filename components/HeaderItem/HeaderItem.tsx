import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useRef, type ReactNode } from 'react';
import { Animated, Pressable, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { THEME } from '../../assets/theme';
import { type RootState } from '../../store/store';
import { IconItem } from '../IconItem/IconItem';
// import { type HeaderProps } from './HeaderItem.type';
import style from './HeaderItem.style';

interface HeaderProps {
  title?: string | null;
  scrollPosition?: Animated.Value | null;
  animTitle?: boolean;
  inputRange?: number[];
  withBackNavigation?: boolean;
  transparent?: boolean;
  forceStatusBarShow?: boolean;
  forceTransparentBackground?: boolean;
}

export const HeaderItem = ({
  title = null,
  scrollPosition = null,
  animTitle = false,
  inputRange = [0, 20],
  withBackNavigation = true,
  transparent = false,
  forceStatusBarShow = false,
  forceTransparentBackground = false
}: HeaderProps): ReactNode => {
  const { top } = useSafeAreaInsets();
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const navigation = useNavigation();
  if (!scrollPosition) scrollPosition = useRef(new Animated.Value(0)).current;

  const headerBackgroundColor = scrollPosition.interpolate({
    inputRange,
    outputRange:
      theme === 'light'
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
    <View>
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
                style={style.backButton}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <IconItem IconElt={ArrowLeft} size="md" color={'black'} stroke="strong" />
              </Pressable>
            )}
          </View>
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
          <View style={style.aside}>
            {/* <Pressable
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              width: 50
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <IconItem IconElt={ArrowLeft} size="md" color={'black'} stroke="strong" />
          </Pressable> */}
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};
