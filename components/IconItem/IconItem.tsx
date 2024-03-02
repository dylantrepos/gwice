import { type PropsWithChildren, type ReactNode } from 'react';
import { type ViewProps, type ViewStyle } from 'react-native';
import { themeStyle } from './IconItem.style';

type Props = ViewProps & {
  IconElt?: any;
  size: 'sm' | 'md' | 'lg' | 'xl';
  color?: string | null;
  stroke?: 'light' | 'strong';
  style?: ViewStyle;
};

export const IconItem = ({
  IconElt,
  size = 'sm',
  stroke = 'light',
  color,
  style
}: PropsWithChildren<Props>): ReactNode => (
  <IconElt
    color={color ?? themeStyle.color.light}
    size={themeStyle.size[size as 'sm' | 'md' | 'lg' | 'xl']}
    strokeWidth={themeStyle.stroke[stroke as 'light' | 'strong']}
    style={{
      ...(style as ViewStyle)
    }}
  />
);
