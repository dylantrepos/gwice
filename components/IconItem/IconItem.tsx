import { ViewProps, ViewStyle } from 'react-native';
import { PropsWithChildren } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { themeStyle } from './IconItem.style';

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
      color={themeStyle.color[theme] as string} 
      size={themeStyle.size[size as 'sm' | 'md' | 'lg' | 'xl']} 
      strokeWidth={themeStyle.stroke[stroke as 'light' | 'strong']} 
      style={{
        ...style as ViewStyle,
      }}
    />
  );
}