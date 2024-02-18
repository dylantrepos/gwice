import { TextProps, Text, TextStyle } from 'react-native';
import style from "./TextItem.style";
import { PropsWithChildren } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { THEME } from '../../assets/palette';

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

  const { theme } = useSelector((state: RootState) => state.generalReducer);

  return (
    <Text 
      style={{
        fontFamily: `Poppins_${weight}${italic ? '_Italic' : ''}`,
        ...style.text, 
        color: THEME.text[theme] as string,
        ...styles, 
      }}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      { children }
    </Text>
  );
}