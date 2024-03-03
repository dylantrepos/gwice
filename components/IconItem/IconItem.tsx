import { type LucideIcon } from 'lucide-react-native';
import { type PropsWithChildren, type ReactNode } from 'react';
import { type ViewProps, type ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { themeStyle } from './IconItem.style';

type Props = ViewProps & {
  IconElt: LucideIcon;
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
}: PropsWithChildren<Props>): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  return (
    <IconElt
      color={color ?? themeStyle.color[theme]}
      size={themeStyle.size[size as 'sm' | 'md' | 'lg' | 'xl']}
      strokeWidth={themeStyle.stroke[stroke as 'light' | 'strong']}
      style={{
        ...(style as ViewStyle)
      }}
    />
  );
};
