import { Animated, View, ViewProps, ViewStyle } from 'react-native';
import style, { themeStyle } from "./ViewItem.style";
import { PropsWithChildren } from "react";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { THEME } from '../../assets/palette';
import { useBackgroundColorLoading } from '../../hooks/useBackgroundColorLoading';

type Props = ViewProps & {
  // weight?: TextStyle['fontWeight'];
  // italic?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
}

export const ViewItem = ({
  isLoading = false,
  style,
  children
}: PropsWithChildren<Props>) => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);

  return (
    <View 
      style={{
        backgroundColor: themeStyle['light'] as string,
        ...style as ViewStyle, 
      }}
    >
      { children }
    </View>
  );
}

ViewItem.Animated = ({
  isLoading = false,
  style,
  children
}: PropsWithChildren<Props>) => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const {backgroundColor} = useBackgroundColorLoading(isLoading);

  return (
    <Animated.View 
      style={{
        backgroundColor: isLoading ? backgroundColor : themeStyle['light'] as string,
        ...style as ViewStyle, 
      }}
    >
      { children }
    </Animated.View>
  );
}