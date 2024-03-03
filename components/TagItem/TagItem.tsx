import { type ReactNode } from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import { formatTitle } from '../../utils/events';
import { IconItem } from '../IconItem/IconItem';
import { TextItem } from '../TextItem/TextItem';
import tagStyle, { themeStyle } from './TagItem.style';

type Props = ViewProps & {
  title: string;
  IconElt?: any;
  style?: ViewStyle;
};

export const TagItem = ({ title, IconElt, style }: Props): ReactNode => {
  const { theme } = useSelector((state: RootState) => state.generalReducer);

  return (
    <View
      style={{
        ...(style as ViewStyle),
        ...tagStyle.tagContainer,
        backgroundColor: themeStyle.background[theme],
        borderColor: themeStyle.border[theme]
      }}
    >
      {IconElt && <IconItem IconElt={IconElt} size="sm" stroke="light" />}
      <TextItem size="sm">{formatTitle(title)}</TextItem>
    </View>
  );
};
