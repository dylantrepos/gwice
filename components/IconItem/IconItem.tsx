import { View, ViewProps, ViewStyle } from 'react-native';
import tagStyle from "./IconItem.style";
import { PropsWithChildren } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { THEME } from '../../assets/palette';
import { useBackgroundColorLoading } from '../../hooks/useBackgroundColorLoading';
import { TextItem } from '../TextItem/TextItem';
import { formatTitle } from '../../utils/events';

type Props = ViewProps & {
  IconElt?: any;
  size: 'sm' | 'md' | 'lg' | 'xl';
  stroke: 'light' | 'strong';
  style?: ViewStyle;
}

export const IconItem = ({
  IconElt,
  size = 'sm',
  stroke = 'light',
  style,
}: PropsWithChildren<Props>) => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);

  return (
    <IconElt
      color={THEME.icon.color[theme] as string} 
      size={THEME.icon.size[size as 'sm' | 'md' | 'lg' | 'xl']} 
      strokeWidth={THEME.icon.stroke[stroke as 'light' | 'strong']} 
      style={{
        ...style as ViewStyle,
      }}
    />
  );
}