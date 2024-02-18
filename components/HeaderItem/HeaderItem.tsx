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
  sticky = false
}: PropsWithChildren<Props>) => {
  const insets = useSafeAreaInsets();
  const { theme } = useSelector((state: RootState) => state.generalReducer);

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
        position: absolute ? 'absolute' : 'relative',
        // top: withBackgroundTransparent ? insets.top : 0
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
              size="md"
            />
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
          />
        </Pressable>
      )}
    </View>
  );
}