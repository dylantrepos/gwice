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

  /**
   * ! Faire un layout commun pour toutes les pages
   * ! -> avec un header en params
   * ! + safeareaview
   * ! + statusbar
   * ! Pour avoir le header qui se fixe au scroll + background / text color qui change
   * ! + Faire des variable pour les coulers pour le dark/light mode
   */


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
        {title && 
          <TextItem 
            size='lg'
            weight='bold'
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