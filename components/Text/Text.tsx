import { TextProps, Text as TextReactNative, TextStyle } from 'react-native';
import style from "./Text.style";
import { PropsWithChildren } from "react";

type Props = TextProps & {
  weight?: TextStyle['fontWeight'];
  italic?: boolean;
  styles?: TextStyle;
}

export const Text = ({
  weight = '400',
  italic = false,
  numberOfLines,
  ellipsizeMode,
  styles,
  children
}: PropsWithChildren<Props>) => {

  return (
    <TextReactNative 
      style={{
        ...style.text, 
        ...styles, 
        fontFamily: `Poppins_${weight}${italic ? '_Italic' : ''}`
      }}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      { children }
    </TextReactNative>
  );
}