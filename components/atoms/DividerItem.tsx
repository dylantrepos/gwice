import { useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { View, type DimensionValue } from 'react-native';
import styles from '../../styles/components/atoms/DividerItem.style';

interface DividerItemProps {
  width?: DimensionValue;
  height?: number;
  spacing?: number;
}

export const DividerItem = ({
  width = '100%',
  height = 1,
  spacing = 0
}: DividerItemProps): ReactNode => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        ...styles,
        borderBottomColor: colors.dividerColor,
        borderBottomWidth: height,
        width,
        marginVertical: spacing
      }}
    />
  );
};
