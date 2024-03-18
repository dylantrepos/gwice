import { type ReactNode } from 'react';
import { Animated } from 'react-native';
import { useBackgroundColorLoading } from '../../../../hooks/useBackgroundColorLoading';
import styles from '../../styles/molecules/EventCardEmptyItem.style';

interface EventCardEmptyItemProps {
  large?: boolean;
}

export const EventCardEmptyItem = ({ large = false }: EventCardEmptyItemProps): ReactNode => {
  const { backgroundColor } = useBackgroundColorLoading(true);

  return (
    <Animated.View
      style={{
        ...(large ? styles.cardLargeEmptyContainer : styles.cardEmptyContainer),
        backgroundColor
      }}
    ></Animated.View>
  );
};
