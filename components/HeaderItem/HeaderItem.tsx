import { Pressable, TextProps, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import { PropsWithChildren } from "react";
import { ChevronLeft, Search } from "lucide-react-native";
import { TextItem } from "../TextItem/TextItem";
import style from './HeaderItem.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import palette from '../../assets/palette';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IconItem } from '../IconItem/IconItem';
import {themeStyle as iconThemeStyle} from '../IconItem/IconItem.style';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';

export type HeaderProps = ViewProps & {
  headerTitle?: string;
  headerTitleColor?: string;
  headerLeftIcon?: any;
  headerRightIcon?: any;
  headerHandleLeftIconPress?: () => void;
  headerHandleRightIconPress?: () => void;
  headerIconSize?: keyof typeof iconThemeStyle.size;
  headerIconColor?: string | null;
  headerIconStroke?: keyof typeof iconThemeStyle.stroke;
  headerBackground?: string;
  headerWithBackNavigation?: boolean;
  headerStyle?: ViewStyle;
}

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
  headerWithBackNavigation = false,
  headerStyle,
}: PropsWithChildren<HeaderProps>) => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();

  return (
    <Animated.View
      style={{
        flex: 1,
        top: insets.top,
        zIndex: 100,
        height: 70,
        width: '100%', 
        backgroundColor: headerBackground ?? 'transparent',
        position: 'absolute',
        flexDirection: 'row',
        ...headerStyle as ViewStyle,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
        >
        { (headerWithBackNavigation && navigate.canGoBack()) && (
          <Pressable
          onPress={() => navigate.goBack()}
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
        { !headerWithBackNavigation && headerLeftIcon && (
          <Pressable
            onPress={headerHandleLeftIconPress}
            style={style.headerIcon}
          >
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
          alignItems: 'center',
        }}
      >
        <TextItem
          weight="regular"
          size="xxl"
          color={headerTitleColor}
        >
          { headerTitle }
        </TextItem>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        { headerRightIcon && (
          <Pressable
            onPress={headerHandleRightIconPress}
            style={style.headerIcon}
          >
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
  );
}