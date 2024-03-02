import { TextProps, Text, TextStyle } from 'react-native';
import styleTextItem, { themeStyle } from "./TextItem.style";
import { PropsWithChildren } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import palette from '../../assets/palette';

type Props = TextProps & {
  size?: keyof typeof themeStyle.size;
  weight?: keyof typeof themeStyle.weight;
  color?: string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  italic?: boolean;
  style?: TextStyle;
}

export const TextItem = ({
  weight = 'light',
  italic = false,
  color,
  size,
  numberOfLines,
  ellipsizeMode,
  style,
  children
}: PropsWithChildren<Props>) => {

  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const font = `Poppins_${themeStyle.weight[weight as keyof typeof themeStyle.weight]}${italic ? '_Italic' : ''}`;

  return (
    <Text 
      style={{
        fontFamily: font,
        color: color ?? themeStyle.color['light'] as string,
        fontSize: themeStyle.size[size as keyof typeof themeStyle.size],
        ...style as TextStyle, 
      } as TextStyle} 
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      { children }
    </Text>
  );
}