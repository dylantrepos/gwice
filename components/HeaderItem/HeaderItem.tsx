import { Pressable, TextProps, TextStyle, View, ViewStyle } from 'react-native';
import { PropsWithChildren } from "react";
import { ChevronLeft, Search } from "lucide-react-native";
import { TextItem } from "../TextItem/TextItem";
import style from './HeaderItem.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import palette from '../../assets/palette';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IconItem } from '../IconItem/IconItem';

type Props = TextProps & {
  title?: string;
  titleColor?: string;
  withBackgroundTransparent?: boolean;
  absolute?: boolean;
  navigation?: any;
  withBackNavigation?: boolean;
  withSearch?: boolean;
  iconColor?: string;
  iconSize?: number;
  sticky?: boolean;
  stickToTop?: boolean;
}


export const HeaderItem = ({
  title = '',
  titleColor = palette.black,
  navigation,
  absolute = true,
  withBackgroundTransparent = false,
  withBackNavigation = true,
  withSearch = true,
  iconColor = 'black',
  iconSize = 24,
  sticky = false,
  stickToTop = false,
}: PropsWithChildren<Props>) => {
  const insets = useSafeAreaInsets();
  const { theme } = useSelector((state: RootState) => state.generalReducer);

  return (
    <View 
      style={{
        ...style.headerContainer,
        backgroundColor: withBackgroundTransparent ? 'transparent' : 'white',
        position: absolute ? 'absolute' : 'relative',
        top: stickToTop ? insets.top : 0
      }}
    >
      <View style={style.headerChevron}>
        { (withBackNavigation && navigation) && (
          <Pressable 
            onPress={() => navigation.goBack()}
            style={style.headerChevron}
          >
            <IconItem
              IconElt={ChevronLeft}
              color={iconColor}
              size="md"
            />
        </Pressable>
        )}
      </View>
      <View style={style.headerTitle}>
        {title && 
          <TextItem 
            size='xl'
            weight="regular"
            style={{
              ...style.headerTitle,
              color: titleColor
            }}
          >
          { title }
      </TextItem>}
      </View>
      {withSearch && (
        <Pressable
          style={style.iconRight}
        >
          <IconItem
            IconElt={Search}
            size="md"
            color={iconColor}
          />
        </Pressable>
      )}
    </View>
  );
}