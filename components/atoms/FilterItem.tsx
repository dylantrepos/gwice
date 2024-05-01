import { useTheme } from '@react-navigation/native';
import { ChevronDown, type LucideIcon } from 'lucide-react-native';
import { type ReactNode } from 'react';
import { Pressable, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { IconItem } from './IconItem';
import { TextItem } from './TextItem';

export enum FilterType {
  DEFAULT = 'default',
  CITY_EVENT = 'cityEvent'
}

type Props = ViewProps & {
  title: string;
  IconElt?: LucideIcon;
  style?: ViewStyle;
  withArrow?: boolean;
  type?: FilterType;
  handlePress: () => void;
};

export const FilterItem = ({
  title,
  IconElt,
  withArrow = true,
  type = FilterType.DEFAULT,
  handlePress
}: Props): ReactNode => {
  const { colors } = useTheme();

  return (
    <Pressable
      style={{
        ...styles.filter,
        backgroundColor: colors.filter[type].backgroundColor
      }}
      onPress={handlePress}
    >
      {IconElt && (
        <IconItem
          size="md"
          stroke="light"
          IconElt={IconElt}
          color={colors.filter[type].textColor}
        />
      )}
      <TextItem color={colors.filter[type].textColor}>{title}</TextItem>
      {withArrow && (
        <IconItem
          size="md"
          stroke="light"
          IconElt={ChevronDown}
          color={colors.filter[type].textColor}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 10,
    borderRadius: 100
  }
});
