import { useTheme } from '@react-navigation/native';
import { type PropsWithChildren, type ReactNode } from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import { themeStyle } from '../../styles/components/atoms/TextItem.style';

type Props = TextProps & {
  size?: keyof typeof themeStyle.size;
  weight?: keyof typeof themeStyle.weight;
  color?: string | undefined;
  numberOfLines?: number | undefined;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
  italic?: boolean;
  style?: TextStyle;
  align?: 'left' | 'center' | 'right' | 'justify' | 'auto' | undefined;
};

export const TextItem = ({
  weight = 'light',
  italic = false,
  color = undefined,
  size = 'md',
  selectable = false,
  numberOfLines,
  ellipsizeMode,
  style,
  align = 'left',
  children
}: PropsWithChildren<Props>): ReactNode => {
  const font = `Poppins_${themeStyle.weight[weight as keyof typeof themeStyle.weight]}${italic ? '_Italic' : ''}`;
  const { colors } = useTheme();

  const textStyle: TextStyle = {
    fontFamily: font,
    color: color ?? colors.text,
    fontSize: themeStyle.size[size],
    lineHeight: themeStyle.lineHeights[size],
    textAlign: align,
    ...(style as TextStyle)
  };

  return (
    <Text
      style={textStyle}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      selectable={selectable}
    >
      {children}
    </Text>
  );
};
