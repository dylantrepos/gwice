import { Pressable, TextProps, TextStyle, View, ViewProps, ViewStyle } from 'react-native';
import { PropsWithChildren } from "react";
import { ChevronLeft, Search } from "lucide-react-native";
import { TextItem } from "../TextItem/TextItem";
import style from './HeaderItem2.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import palette from '../../assets/palette';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IconItem } from '../IconItem/IconItem';
import {themeStyle as iconThemeStyle} from '../IconItem/IconItem.style';
import { useNavigation } from '@react-navigation/native';

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
  headerWithTransparentBackground?: boolean;
  headerWithBackNavigation?: boolean;
  headerStyle?: ViewStyle;
}

export const HeaderItem2 = ({
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
  headerWithTransparentBackground = false,
  headerWithBackNavigation = false,
  headerStyle,
}: PropsWithChildren<HeaderProps>) => {
  const insets = useSafeAreaInsets();
  const navigate = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        top: insets.top,
        zIndex: 100,
        height: 70,
        width: '100%',
        backgroundColor: headerWithTransparentBackground ? 'transparent' : headerBackground,
        position: 'absolute',
        flexDirection: 'row',
        ...headerStyle as ViewStyle,
      }}
    >
      <View
        style={{
          flex: 1,
          // backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        { (headerWithBackNavigation && navigate.canGoBack()) && (
          <Pressable
            onPress={() => navigate.goBack()}
          >
            <IconItem 
              IconElt={ChevronLeft}
              size={headerIconSize}
              color={palette.black}
              stroke={headerIconStroke}
            />
          </Pressable>
        )}
        { !headerWithBackNavigation && headerLeftIcon && (
          <Pressable
            onPress={headerHandleLeftIconPress}
          >
            <IconItem 
              IconElt={headerLeftIcon}
              size={headerIconSize}
              color={palette.black}
              stroke={headerIconStroke}
            />
          </Pressable>
        )}
      </View>
      <View
        style={{  
          flex: 3,
          // backgroundColor: 'green',
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
          // backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        { headerRightIcon && (
          <Pressable
            onPress={headerHandleRightIconPress}
          >
            <IconItem 
              IconElt={headerRightIcon}
              size={headerIconSize}
              color={palette.black}
              stroke={headerIconStroke}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}