import { type PropsWithChildren, type ReactNode } from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { themeStyle } from './TextItem.style';

type Props = TextProps & {
  size?: keyof typeof themeStyle.size;
  weight?: keyof typeof themeStyle.weight;
  color?: string | undefined;
  numberOfLines?: number | undefined;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  italic?: boolean;
  style?: TextStyle;
};

export const TextItem = ({
  weight = 'light',
  italic = false,
  color = undefined,
  size = 'md',
  numberOfLines,
  ellipsizeMode,
  style,
  children
}: PropsWithChildren<Props>): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const font = `Poppins_${themeStyle.weight[weight as keyof typeof themeStyle.weight]}${italic ? '_Italic' : ''}`;

  const textStyle: TextStyle = {
    fontFamily: font,
    color: color ?? themeStyle.color[theme],
    fontSize: themeStyle.size[size],
    ...(style as TextStyle)
  };

  return (
    <Text style={textStyle} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>
      {children}
    </Text>
  );
};
