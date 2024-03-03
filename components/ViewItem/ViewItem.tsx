import { type PropsWithChildren, type ReactNode } from 'react';
import { Animated, View, type ViewProps, type ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { useBackgroundColorLoading } from '../../hooks/useBackgroundColorLoading';
import { type RootState } from '../../store/store';
import { themeStyle } from './ViewItem.style';

type Props = ViewProps & {
  // weight?: TextStyle['fontWeight'];
  // italic?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
};

export const ViewItem = ({
  isLoading = false,
  style,
  children
}: PropsWithChildren<Props>): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);

  return (
    <View
      style={{
        backgroundColor: themeStyle[theme],
        ...(style as ViewStyle)
      }}
    >
      {children}
    </View>
  );
};

export const ViewItemAnimated = ({
  isLoading = false,
  style,
  children
}: PropsWithChildren<Props>): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);
  const { backgroundColor } = useBackgroundColorLoading(isLoading);

  return (
    <Animated.View
      style={{
        backgroundColor: isLoading ? backgroundColor : themeStyle[theme],
        ...(style as ViewStyle)
      }}
    >
      {children}
    </Animated.View>
  );
};
