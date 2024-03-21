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
  state?: 'active' | 'inactive';
};

export const TagItem = ({
  title,
  IconElt,
  style,
  size = 'sm',
  state = 'inactive'
}: Props): ReactNode => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        ...tagStyle.tagContainer,
        backgroundColor: state === 'active' ? colors.tagBackgroundActive : colors.tagBackground,
        borderColor: colors.tagBorder,
        ...(style as ViewStyle)
      }}
    >
      {IconElt && <IconItem IconElt={IconElt} size={size} stroke="light" />}
      <TextItem
        size={size}
        color={state === 'active' ? colors.tagTextActiveColor : colors.tagTextColor}
      >
        {formatTitle(title)}
      </TextItem>
    </View>
  );
};
