import { Pressable, TextProps, TextStyle, View, ViewStyle } from 'react-native';
import { PropsWithChildren } from "react";
import { ChevronLeft } from "lucide-react-native";
import { Text } from "../Text/Text";
import style from './HeaderPage.style';

type Props = TextProps & {
  title: string;
  navigation?: any;
  styles?: ViewStyle;
  iconColor?: string;
  iconSize?: number;
  titleStyles?: TextStyle;
}

export const HeaderPage = ({
  title,
  navigation,
  styles,
  iconColor = 'black',
  iconSize = 30,
  titleStyles,
}: PropsWithChildren<Props>) => {


  return (
    <View style={{...style.header, ...styles}}>
      { navigation && (
        <Pressable 
          onPress={() => navigation.goBack()}
          style={style.headerChevron}
        >
          <ChevronLeft color={iconColor} size={iconSize}/>
      </Pressable>
      )}
      <Text 
        styles={{
          ...style.headerTitle,
          ...titleStyles ?? ''
        }}
        >
          { title }
      </Text>
    </View>
  );
}