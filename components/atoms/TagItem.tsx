import { useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import tagStyle from '../../styles/components/atoms/TagItem.style';
import { formatTitle } from '../../utils/events';
import { IconItem } from './IconItem';
import { TextItem } from './TextItem';

type Props = ViewProps & {
  title: string;
  IconElt?: any;
  style?: ViewStyle;
  size?: 'sm' | 'md' | 'lg';
};

export const TagItem = ({ title, IconElt, style, size = 'sm' }: Props): ReactNode => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        ...(style as ViewStyle),
        ...tagStyle.tagContainer,
        backgroundColor: colors.tagBackground,
        borderColor: colors.tagBorder
      }}
    >
      {IconElt && <IconItem IconElt={IconElt} size={size} stroke="light" />}
      <TextItem size={size}>{formatTitle(title)}</TextItem>
    </View>
  );
};
