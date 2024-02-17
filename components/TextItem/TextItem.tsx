import { TextProps, Text, TextStyle } from 'react-native';
import style from "./TextItem.style";
import { PropsWithChildren } from "react";

type Props = TextProps & {
  weight?: TextStyle['fontWeight'];
  italic?: boolean;
  styles?: TextStyle;
}

export const TextItem = ({
  weight = '400',
  italic = false,
  numberOfLines,
  ellipsizeMode,
  styles,
  children
}: PropsWithChildren<Props>) => {

  return (
    <Text 
      style={{
        fontFamily: `Poppins_${weight}${italic ? '_Italic' : ''}`,
        ...style.text, 
        ...styles, 
      }}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      { children }
    </Text>
  );
}