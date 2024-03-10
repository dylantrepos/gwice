import { useTheme } from '@react-navigation/native';
import { type ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { formatTitle } from '../../utils/events';
import { IconItem } from '../IconItem/IconItem';
import { TextItem } from '../TextItem/TextItem';
import tagStyle from './TagItem.style';

type Props = ViewProps & {
  title: string;
  IconElt?: any;
  style?: ViewStyle;
};

export const TagItem = ({ title, IconElt, style }: Props): ReactNode => {
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
      {IconElt && <IconItem IconElt={IconElt} size="sm" stroke="light" />}
      <TextItem size="sm">{formatTitle(title)}</TextItem>
    </View>
  );
};
