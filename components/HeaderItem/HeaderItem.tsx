import { Pressable, TextProps, TextStyle, View, ViewStyle } from 'react-native';
import { PropsWithChildren } from "react";
import { ChevronLeft, Search } from "lucide-react-native";
import { TextItem } from "../TextItem/TextItem";
import style from './HeaderItem.style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = TextProps & {
  title?: string;
  titleColor?: string;
  withBackgroundTransparent?: boolean;
  navigation?: any;
  withBackNavigation?: boolean;
  withSearch?: boolean;
  iconColor?: string;
  iconSize?: number;
}

export const HeaderItem = ({
  title = '',
  titleColor = '#0D89CE',
  navigation,
  withBackgroundTransparent = false,
  withBackNavigation = true,
  withSearch = true,
  iconColor = 'black',
  iconSize = 24,
}: PropsWithChildren<Props>) => {
  const insets = useSafeAreaInsets();


console.log('withBackgroundTransparent : ', withBackgroundTransparent);
  return (
    <View 
      style={{
        ...style.headerContainer,
        backgroundColor: withBackgroundTransparent ? 'transparent' : 'white',
        position: withBackgroundTransparent ? 'absolute' : 'relative',
        top: withBackgroundTransparent ? insets.top : 0
      }}
    >
      <View style={style.headerChevron}>
        { (withBackNavigation && navigation) && (
          <Pressable 
            onPress={() => navigation.goBack()}
            style={style.headerChevron}
          >
            <ChevronLeft color={iconColor} size={iconSize}/>
        </Pressable>
        )}
      </View>
      <View style={style.headerTitle}>
        {title && <TextItem 
        styles={{
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
          <Search
            color={iconColor} 
            size={iconSize}
            strokeWidth={2}
          />
        </Pressable>
      )}
    </View>
  );
}